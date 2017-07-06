import {Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {  ChangeDetectionStrategy } from '@angular/core';
import { CalendarEvent, CalendarDateFormatter } from 'angular-calendar';

@Component({
    templateUrl: './visitsCalendar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./visitsCalendar.component.scss']
})
export class VisitsCalendarComponent implements OnInit {

    view: string = 'month';

    viewDate: Date = new Date();

    events: CalendarEvent[] = [];

    locale: string = 'pl';

    // weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
    //
    // weekendDays: number[] = [
    //     DAYS_OF_WEEK.FRIDAY,
    //     DAYS_OF_WEEK.SATURDAY
    // ];

    // patients: Patient[] = [];
    private router: Router;

    constructor() {
        // this.patients = JSON.parse(localStorage.getItem('patients'));
    }

    ngOnInit() {
        this.loadAllPatients();
    }

    private loadAllPatients() {
        // this.patientService.getPatients().subscribe(patients => { this.patients = patients; });
    }


}
