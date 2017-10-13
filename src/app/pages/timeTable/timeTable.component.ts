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
    asString: string
}
interface DoctorInfo {
    doctorName: string;
    doctorHumanId: number;
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
    private endDate: Date = new Date(); //init in onInit

    private doctorData: { [key: number]: Doctor[]; }

    private config: FieldConfig[] =        [ {
        type: 'date',
        label: 'Start Date-time',
        name: 'startDateTime',
        placeholder: 'Date-time'
    },
    {
        type: 'date',
        label: 'End Date-time',
        name: 'endDateTime',
        //placeholder: 'Date-time'
    },
    {
        label: 'Submit',
        name: 'submit',
        type: 'button'
    }]

    private mergeDocs(doctors: Doctor[]): { [key: number]: Doctor[]; } {
        var result: { [key: number]: Doctor[]; } = {}

        for (var doc of doctors) {
            result[doc.personId] = []
        }
        for (var doc of doctors) {
            result[doc.personId].push(doc)
        }

        console.log("ZAL")
        console.log(result)
        return result;
    }

    changeTimeRange(event): void {
        console.log(event)        
        if(event.startDateTime != undefined && event.endDateTime != undefined){
            var s = event.startDateTime
            var e = event.endDateTime
            if(!s.includes(":")){
                s = s + " 10:10"
            }
            if(!e.includes(":")){
                e = e + " 10:10"
            }
            this.startDate =new Date(s)
            this.endDate = new Date(e)
            this.reloadDoctors()
        }
    }

    reloadDoctors() {
        this.startDate.setHours(0, 0, 0, 0);
        this.endDate.setHours(23, 59, 59, 999);
        console.log(" FROM " + this.startDate + " to " + this.endDate)

        this.doctorService.getAll().subscribe(doctors => {
            let docsAndTimeSlot: Observable<[Doctor, TimeSlot[]]>[] = doctors.map(doctor => {
                let timeSlots: Observable<TimeSlot[]> = this.timeSlotService
                    .getTimeSlots(doctor, this.startDate, this.endDate);
                let result: Observable<[Doctor, TimeSlot[]]> = timeSlots.map(t => [doctor, t])
                return result;
            })
            this.doctorData = this.mergeDocs(doctors)
            Observable.forkJoin(docsAndTimeSlot).subscribe((resQ: [Doctor, TimeSlot[]][]) => {
                var doctorInfos: DoctorInfo[] = []
                console.log("TRUD SKOŃCZONY")
                console.log(resQ)
                let daysCount = Math.round((this.endDate.getTime() - this.startDate.getTime()) / 1000 / 60 / 60 / 24)
                console.log(daysCount)
                for (var resw of resQ) {
                    var [doctor, slots] = resw
                    var processedDocInfo: DoctorInfo;
                    var arr = []
                    for (var j =0; j< daysCount; j++){
                        arr.push([])
                    }
                    if (doctorInfos.filter(d => d.doctorHumanId == doctor.personId).length == 0) {
                        doctorInfos.push({
                            doctorName: doctor.firstName + " " + doctor.lastName,
                            doctorHumanId: doctor.personId,
                            subsequentDaysInfo: arr
                        })
                    }
                    processedDocInfo= doctorInfos.filter(d => d.doctorHumanId == doctor.personId)[0]
                    // console.log("slots")
                    // console.log(slots)
                    for (var i = 0; i < daysCount; i++) {
                        let sdate: Date = new Date(this.startDate.getTime())
                        sdate.setDate(this.startDate.getDate() + i)
                        let edate: Date = new Date(this.startDate.getTime())
                        edate.setDate(this.startDate.getDate() + i + 1)
                        let goodSlots: SlotInfo[] = slots.filter(s => {
                            // console.log(sdate + " < " + s.startDateTime + " ? " +
                                // edate + " > " + s.endDateTime + " ? " +
                                // + (s.startDateTime.getTime > sdate.getTime && s.endDateTime.getTime < edate.getTime) + " no i co")
                            // console.log(s.startDateTime)
                            return new Date(s.startDateTime).getTime() > sdate.getTime()
                                && new Date(s.endDateTime).getTime() < edate.getTime()
                        }).map(slot => {
                            return {
                                startTime: new Date(slot.startDateTime),
                                endTime: new Date(slot.endDateTime),
                                asString: this.toHourString(new Date(slot.startDateTime), new Date(slot.endDateTime))
                            };
                        })
                        // console.log(sdate + " do " + edate)
                        // console.log(goodSlots)

                        var procs: SlotInfo[] = processedDocInfo.subsequentDaysInfo[i]

                        for (var ii of goodSlots) {
                            procs.push(ii)
                        }

                    }
                }
                for (var infoQ of doctorInfos){
                    for (var info of infoQ.subsequentDaysInfo)
                    info.sort((s1, s2) => {
                        if(s1.startTime.getTime() < s2.startTime.getTime()){
                            return -1;
                        }else if(s1.startTime.getTime() > s2.startTime.getTime()){
                            return 1;
                        }else{
                            return 0;
                        }
                    })
                }
                this.doctorInfos = doctorInfos
                console.log(this.doctorInfos)
            })

        })
    }

    private toHourString(d1: Date, d2: Date): string {
        return d1.getHours() + ":" + d1.getMinutes() + " - " + d2.getHours() + ":" + d2.getMinutes()
    }



    ngOnInit() {
        this.endDate.setDate(this.startDate.getDate() + 6)
        this.reloadDoctors();
    }




}
