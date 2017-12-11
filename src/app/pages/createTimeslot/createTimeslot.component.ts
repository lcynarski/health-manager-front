import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { DoctorService } from '../../_services/doctor.service';

import { FieldConfig } from '../../components/dynamic-form/models/field-config.interface';
import { DynamicFormComponent } from '../../components/dynamic-form/containers/dynamic-form/dynamic-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Http } from '@angular/http';
import moment = require('moment');
import { timer } from 'rxjs/observable/timer';

@Component({
    providers: [DoctorService],
    selector: 'create-patient',
    styleUrls: ['createTimeslot.component.scss'],
    templateUrl: './createTimeslot.component.html'
})
export class CreateTimeslotComponent implements AfterViewInit, OnInit {

    private static NO_REPEAT: string = 'No repeat'
    private static EACH_DAY: string = 'Each day'
    private static EACH_WEEK: string = 'Each week'
    private static MONDAY_TO_FRIDAY: string = 'Monday to Friday'
    private static REPETITION_MODES: [string] = [
        CreateTimeslotComponent.NO_REPEAT,
        CreateTimeslotComponent.EACH_DAY,
        CreateTimeslotComponent.EACH_WEEK,
        CreateTimeslotComponent.MONDAY_TO_FRIDAY]

    @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
    private router: Router;
    public docIdByName;

    private info: string = ""

    constructor(
        router: Router,
        private doctorService: DoctorService) {
        this.router = router;
    }

    config: FieldConfig[] = [
        {
            type: 'select',
            label: 'Doctor',
            name: 'doctor',
            placeholder: 'Select a doctor',
            options: []
        },
        {
            type: 'date',
            label: 'Date',
            name: 'date',
            placeholder: 'Date'
        },
        {
            type: 'input',
            label: 'Start hour',
            name: 'startHour',
            placeholder: 'Start hour'
        },
        {
            type: 'input',
            label: 'End hour',
            name: 'endHour',
            placeholder: 'End hour'
        },
        {
            type: 'checkbox',
            label: 'Available for self-sign',
            name: 'availableForSelfSign',
            value: true
        },
        {
            label: 'Submit single slot',
            name: 'submit',
            type: 'button'
        },
        {
            type: 'input',
            label: 'Minutes for visit',
            name: 'minutesForVisit',
            placeholder: 'Minutes for each visit',
        },
        {
            type: 'input',
            label: 'Break between visits',
            name: 'minutesForBreak',
            placeholder: 'Minutes of break between visits',
        },
        {
            type: 'select',
            label: 'Day repetition mode',
            name: 'repetitionMode',
            placeholder: 'Day Repetition mode',
            options: CreateTimeslotComponent.REPETITION_MODES,
            value: CreateTimeslotComponent.NO_REPEAT
        },
        {
            type: 'date',
            label: 'Repeat until',
            name: 'endDate',
            placeholder: 'Repeat until'
        },
        {
            label: 'Submit multiple slots',
            name: 'submitMulti',
            type: 'button'
        }
    ];

    ngOnInit(): void {
        console.log('Zbieram doktorków!')
        this.docIdByName = {};
        this.doctorService.getAll()
            .subscribe((doctors) => {
                doctors.forEach((doctor) => {
                    this.docIdByName[`${doctor.firstName} ${doctor.lastName}`] = doctor._id;
                })
                this.config[0].options = doctors.map((doctor) => `${doctor.firstName} ${doctor.lastName}`);
                console.log('Doktorkowie zebrani!')
            })
    }

    ngAfterViewInit() {
        let previousValid = this.form.valid;
        this.form.changes.subscribe(() => {
            if (this.form.valid !== previousValid) {
                previousValid = this.form.valid;
                this.form.setDisabled('submit', !previousValid);
            }
        });
        // this.form.setDisabled('submit', true);
    }

    submitMulti(value) {
        console.log('SubmitMulti')
        if (value.startHour == undefined) {
            this.info = "Missing start hour"
            return
        }
        if (value.endHour == undefined) {
            this.info = "Missing end hour"
            return
        }
        let startHourMinute: [number, number] = this.splitStringIntoHourMinute(value.startHour)
        let endHourMinute: [number, number] = this.splitStringIntoHourMinute(value.endHour)
        if (startHourMinute == null || startHourMinute[0] == null || startHourMinute[1] == null) {
            this.info = "Invalid start hour. Format: HH:mm"
            return
        }
        if (endHourMinute == null || endHourMinute[0] == null || endHourMinute[1] == null) {
            this.info = "Invalid end hour. Format: HH:mm"
            return
        }
        if (!this.startBeforeEnd(startHourMinute, endHourMinute)) {
            this.info = "Start cannot be after end!"
            return
        }
        if (value.minutesForVisit == undefined) {
            this.info = "How long should each visit take?"
            return
        }
        if (value.minutesForBreak == undefined) {
            this.info = "How long break between visits should be?"
            return
        }
        if (value.repetitionMode == undefined) {
            value.repetitionMode = CreateTimeslotComponent.NO_REPEAT;
        }
        if (value.repetitionMode != CreateTimeslotComponent.NO_REPEAT) {
            if (value.endDate == undefined) {
                this.info = "Missing end date"
                return
            }
            if (moment(value.date) > (moment(value.endDate))) {
                return //job finished
            }
        }

        let minutesForVisit: number = + value.minutesForVisit
        let minutesForBreak: number = + value.minutesForBreak

        var timeSlotIntervals = []
        var currentTimeSlotStart: [number, number] = startHourMinute
        while (this.startBeforEqualeEnd(this.getTimeSlotEnd(currentTimeSlotStart, minutesForVisit), endHourMinute)) {
            timeSlotIntervals.push({
                start: currentTimeSlotStart,
                end: this.getTimeSlotEnd(currentTimeSlotStart, minutesForVisit)
            })
            currentTimeSlotStart = this.getNextTimeSlotStart(currentTimeSlotStart, minutesForVisit, minutesForBreak)
        }

        console.log("intervals to save:")
        console.log(timeSlotIntervals)

        for (var i = 0; i < timeSlotIntervals.length; i++) {
            let interval = timeSlotIntervals[i]
            var valueCopy = JSON.parse(JSON.stringify(value));
            valueCopy.startHour = interval.start[0] + ":" + interval.start[1]
            valueCopy.endHour = interval.end[0] + ":" + interval.end[1]
            this.validateAndSaveSingle(valueCopy)
        }

        if (value.repetitionMode != CreateTimeslotComponent.NO_REPEAT) {
            var daysInterval: number
            if (value.repetitionMode == CreateTimeslotComponent.EACH_DAY) {
                daysInterval = 1
            } else if (value.repetitionMode == CreateTimeslotComponent.EACH_WEEK) {
                daysInterval = 7
            } else if (value.repetitionMode == CreateTimeslotComponent.MONDAY_TO_FRIDAY) {
                let weekDay: number = moment(value.date).isoWeekday(); //1 - moday, 7 - sunday
                if (weekDay == 5) {
                    daysInterval = 3
                } if (weekDay == 6) {
                    daysInterval = 2
                } else {
                    daysInterval = 1
                }
            }
            var valueCopy = JSON.parse(JSON.stringify(value));
            valueCopy.date = new Date(value.date.setTime(
                value.date.getTime() + daysInterval * 86400000));
            this.submitMulti(valueCopy)
        }
    }

    addMinutes(time: [number, number], minutesToAdd: number): [number, number] {
        return [time[0] + Math.floor((time[1] + minutesToAdd) / 60), (time[1] + minutesToAdd) % 60]

    }

    getTimeSlotEnd(slotStart: [number, number], minutesForVisit: number): [number, number] {
        return this.addMinutes(slotStart, minutesForVisit)
    }

    getNextTimeSlotStart(slotStart: [number, number], minutesForVisit: number, minutesForBreak: number): [number, number] {
        return this.addMinutes(this.getTimeSlotEnd(slotStart, minutesForVisit), minutesForBreak)
    }
    submit(value) {
        this.info = ""
        console.log('submit')
        console.log(value)
        if (value['minutesForVisit'] != undefined) {
            this.submitMulti(value) //bo przycisk 'Submit multi' robi zwykłe submit
        } else {
            this.validateAndSaveSingle(value)
        }
    }


    validateAndSaveSingle(value) {
        if (value.doctor == undefined) {
            this.info = "Missing doctor"
            return
        }
        if (value.date == undefined) {
            this.info = "Missing date"
            return
        }
        if (value.startHour == undefined) {
            this.info = "Missing start hour"
            return
        }
        if (value.endHour == undefined) {
            this.info = "Missing end hour"
            return
        }
        let startHourMinute: [number, number] = this.splitStringIntoHourMinute(value.startHour)
        let endHourMinute: [number, number] = this.splitStringIntoHourMinute(value.endHour)
        if (startHourMinute == null || startHourMinute[0] == null || startHourMinute[1] == null) {
            this.info = "Invalid start hour. Format: HH:mm"
            return
        }
        if (endHourMinute == null || endHourMinute[0] == null || endHourMinute[1] == null) {
            this.info = "Invalid end hour. Format: HH:mm"
            return
        }
        if (!this.startBeforeEnd(startHourMinute, endHourMinute)) {
            this.info = "Start cannot be after end!"
            return
        }
        if (value.repetitionMode != undefined
            && value.repetitionMode == CreateTimeslotComponent.MONDAY_TO_FRIDAY
            && moment(value.date).isoWeekday() > 5) {
            return
        }
        const timeSlot = {
            id: 0,
            startDateTime: moment(value.date).hour(startHourMinute[0])
                .minute(startHourMinute[1]).format('YYYY-MM-DD HH:mm'),
            endDateTime: moment(value.date).hour(endHourMinute[0])
                .minute(endHourMinute[1]).format('YYYY-MM-DD HH:mm'),
            availableForSelfSign: value.availableForSelfSign
        };
        this.doctorService.saveTimeSlot(timeSlot, this.docIdByName[value.doctor])
            .catch(err => {
                this.info = "Timeslot interleaves with another one!"
                return null;
            }).subscribe((data) => {
                if (data != null) {
                    this.info = "Timeslot saved!"
                }
                console.log(value)
                console.log(data);
            });
    }

    startBeforeEnd(start: [number, number], end: [number, number]): boolean {
        return start[0] < end[0] || (start[0] == end[0] && start[1] < end[1])
    }

    startBeforEqualeEnd(start: [number, number], end: [number, number]): boolean {
        return start[0] < end[0] || (start[0] == end[0] && start[1] <= end[1])
    }

    splitStringIntoHourMinute(input: string): [number, number] {
        let dotAttempt: string[] = input.split('.')
        var hour: number = null
        var min: number = null
        if (dotAttempt.length == 2 && this.isNumber(dotAttempt[0]) && this.isNumber(dotAttempt[1])) {
            hour = +dotAttempt[0]
            min = +dotAttempt[1]
        }
        let colonAttempt: string[] = input.split(':')
        if (colonAttempt.length == 2 && this.isNumber(colonAttempt[0]) && this.isNumber(colonAttempt[1])) {
            hour = +colonAttempt[0]
            min = +colonAttempt[1]
        }
        if (hour == null || min == null || hour >= 24 || hour < 0 || min >= 60 || min < 0) {
            return null
        } else {
            return [hour, min]
        }
    }

    isNumber(obj: string) {
        return !isNaN(parseFloat(obj))
    }
}
