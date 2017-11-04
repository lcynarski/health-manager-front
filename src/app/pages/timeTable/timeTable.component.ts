import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ChangeDetectionStrategy } from '@angular/core';
import { CalendarEvent, CalendarDateFormatter } from 'angular-calendar';
import { ModalComponent } from 'ng2-bs4-modal/ng2-bs4-modal';
import { Doctor } from "../../_models/doctor";
import { DoctorService } from "../../_services/doctor.service";
import { TimeSlotService } from "../../_services/timeSlot.service";
import { Observable } from "rxjs/Observable";
import { TimeSlot } from '../../_models/timeslot';
import { FieldConfig } from '../../components/dynamic-form/models/field-config.interface';

interface SlotInfo {
    startTime: Date
    endTime: Date
    asString: string // for display
}
interface DoctorInfo {
    doctorName: string; //for display
    personId: number; //to identify same doctor with multiple specializations
    subsequentDaysInfo: SlotInfo[][]; //każdy dzień może mieć kilka terminów
}

@Component({
    providers: [DoctorService, TimeSlotService],
    templateUrl: './timeTable.component.html'
})
export class TimeTableComponent implements OnInit {
    constructor(private doctorService: DoctorService,
        private timeSlotService: TimeSlotService,
        private router: Router) {
    }

    private doctorInfos: DoctorInfo[]

    private startDate: Date = new Date();
    private endDate: Date = this.initEndDate()
    private initEndDate(): Date {
        var date = new Date();
        date.setDate(this.startDate.getDate() + 6)
        return date
    }
    private datesSequence: string[] = []; //for displaying as table header

    private config: FieldConfig[] = [{
        type: 'date',
        label: 'Start Date-time',
        name: 'startDateTime',
    },
    {
        type: 'date',
        label: 'End Date-time',
        name: 'endDateTime',
    },
    {
        label: 'Submit',
        name: 'submit',
        type: 'button'
    }]

    refresh() {
        this.startDate.setHours(0, 0, 0, 0);
        this.endDate.setHours(23, 59, 59, 999);
        this.doctorService.getAll().subscribe(doctors => {
            let doctorTimeSlots: Observable<[Doctor, TimeSlot[]]>[] = doctors.map(doctor => {
                let timeSlots: Observable<TimeSlot[]> = this.timeSlotService
                    .getTimeSlots(doctor, this.startDate, this.endDate);
                return timeSlots.map(slot => [doctor, slot])
            })
            Observable.forkJoin(doctorTimeSlots).subscribe((everyDoctorData: [Doctor, TimeSlot[]][]) =>
                this.refreshWithDataReady(everyDoctorData))
        })
    }

    private refreshWithDataReady(everyDoctorData: [Doctor, TimeSlot[]][]): void {
        var newDoctorInfos: DoctorInfo[] = []
        var newDatesSequence: string[] = []
        let daysCount = Math.round((this.endDate.getTime() - this.startDate.getTime()) / 1000 / 60 / 60 / 24)
        for (var dayOffset = 0; dayOffset < daysCount; dayOffset++) {
            let dayTime: Date = new Date(this.startDate.getTime())
            dayTime.setDate(this.startDate.getDate() + dayOffset)
            newDatesSequence.push(dayTime.getDate() + "." + (dayTime.getMonth() + 1))
        }
        this.datesSequence = newDatesSequence        
        for (var singleDoctorData of everyDoctorData) {
            var [doctor, slots] = singleDoctorData
            this.refreshSingleDoctorInfo(doctor, slots, newDoctorInfos, daysCount)
        }
        this.doctorInfos = this.sortSlotsInsideDoctorInfo(newDoctorInfos)
    }

    private refreshSingleDoctorInfo(doctor: Doctor, slots: TimeSlot[],
        doctorInfos: DoctorInfo[],  daysCount: number): void {
        var processedDocInfo: DoctorInfo = this.getOrCreateDoctorInfo(doctor, doctorInfos, daysCount)
        for (var dayOffset = 0; dayOffset < daysCount; dayOffset++) {
            let dayStartTime: Date = new Date(this.startDate.getTime())
            dayStartTime.setDate(this.startDate.getDate() + dayOffset)
            let dayEndTime: Date = new Date(this.startDate.getTime())
            dayEndTime.setDate(this.startDate.getDate() + dayOffset + 1)
            let slotInfos: SlotInfo[] = this.createSlotInfosForDay(slots, dayStartTime, dayEndTime)
            var resultArray: SlotInfo[] = processedDocInfo.subsequentDaysInfo[dayOffset]
            for (var slot of slotInfos) {
                resultArray.push(slot)
            }
        }
    }

    private createSlotInfosForDay(slots: TimeSlot[], dayStartTime: Date, dayEndTime: Date): SlotInfo[] {
        return slots.filter(slot =>
            slot.startDateTime.getTime() > dayStartTime.getTime()
            && slot.endDateTime.getTime() < dayEndTime.getTime())
            .map(slot => {
                return {
                    startTime: slot.startDateTime,
                    endTime: slot.endDateTime,
                    asString: this.toHourString(slot.startDateTime, slot.endDateTime)
                }
            })
    }

    private getOrCreateDoctorInfo(doctor: Doctor, doctorInfos: DoctorInfo[], daysCount: number): DoctorInfo {
        if (doctorInfos.filter(d => d.personId == doctor.personId).length == 0) {
            var doctorInfo: DoctorInfo = {
                doctorName: doctor.firstName + " " + doctor.lastName,
                personId: doctor.personId,
                subsequentDaysInfo: this.prepareSubsequentDaysInfoArray(daysCount)
            }
            doctorInfos.push(doctorInfo)
            return doctorInfo
        } else {
            return doctorInfos.filter(d => d.personId == doctor.personId)[0]
        }
    }

    private sortSlotsInsideDoctorInfo(doctorInfos: DoctorInfo[]): DoctorInfo[] {
        for (var doctorInfo of doctorInfos) {
            for (var info of doctorInfo.subsequentDaysInfo)
                info.sort((s1, s2) => {
                    if (s1.startTime.getTime() < s2.startTime.getTime()) {
                        return -1;
                    } else if (s1.startTime.getTime() > s2.startTime.getTime()) {
                        return 1;
                    } else {
                        return 0;
                    }
                })
        }
        return doctorInfos;
    }

    private toHourString(d1: Date, d2: Date): string {
        return d1.getHours() + ":" +
            this.safeMinutes(d1.getMinutes()) + "\u00A0-\u00A0" + //NPSP
            d2.getHours() + ":" +
            this.safeMinutes(d2.getMinutes());
    }

    private safeMinutes(minute: number): string {
        let str: string = minute + ""
        if (str.length == 1) {
            return "0" + str;
        } else {
            return str;
        }
    }

    private changeTimeRange(event): void {
        if (event.startDateTime != undefined && event.endDateTime != undefined) {
            var start = event.startDateTime
            var end = event.endDateTime
            if (!start.includes(":")) { //hacks to make our date-picker work(((
                start = start + " 10:10"
            }
            if (!end.includes(":")) {
                end = end + " 10:10"
            }
            this.startDate = new Date(start)
            this.endDate = new Date(end)
            this.refresh()
        }
    }

    private prepareSubsequentDaysInfoArray(daysCount: number): SlotInfo[][] {
        var result = []
        for (var i = 0; i < daysCount; i++) {
            result.push([])
        }
        return result
    }

    ngOnInit() {
        this.refresh();
    }
}
