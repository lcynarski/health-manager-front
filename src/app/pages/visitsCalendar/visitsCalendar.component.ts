import {Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {  ChangeDetectionStrategy } from '@angular/core';
import { CalendarEvent, CalendarDateFormatter } from 'angular-calendar';
import { ModalComponent } from 'ng2-bs4-modal/ng2-bs4-modal';


@Component({
    templateUrl: './visitsCalendar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./visitsCalendar.component.scss']
})
export class VisitsCalendarComponent implements OnInit {
    @ViewChild('visitModal') modal: ModalComponent;


    constructor( ) {

    }


    view: string = 'month';

    viewDate: Date = new Date();

    colors: any = {
        red: {
            primary: '#ad2121',
            secondary: '#FAE3E3'
        },
        blue: {
            primary: '#1e90ff',
            secondary: '#D1E8FF'
        },
        yellow: {
            primary: '#e3bc08',
            secondary: '#FDF1BA'
        }
    };

    events: CalendarEvent[] = [{
        title: 'Click me',
        color: this.colors.yellow,
        start: new Date()
    }, {
        title: 'Or click me',
        color: this.colors.blue,
        start: new Date()
    }];

    locale: string = 'pl';

    modalDate:string;
    modalTime:string;


    eventClicked({event}: {event: CalendarEvent}): void {
        console.log('Przed');
        this.modalDate = event.start.toLocaleDateString();
        this.modalTime = event.start.toLocaleTimeString().substring(0,5);
        console.log(event);

        this.modal.open();

        console.log("Po");
    }

    // weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
    //
    // weekendDays: number[] = [
    //     DAYS_OF_WEEK.FRIDAY,
    //     DAYS_OF_WEEK.SATURDAY
    // ];

    // patients: Patient[] = [];
    private router: Router;



    ngOnInit() {
        this.loadAllPatients();
    }

    private loadAllPatients() {
        // this.patientService.getPatients().subscribe(patients => { this.patients = patients; });
    }


}
