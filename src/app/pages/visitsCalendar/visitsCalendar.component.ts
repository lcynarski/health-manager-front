import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {  ChangeDetectionStrategy } from '@angular/core';
import { CalendarEvent, CalendarDateFormatter } from 'angular-calendar';
import { ModalComponent } from 'ng2-bs4-modal/ng2-bs4-modal';
import {DoctorService} from "../../_services/doctor.service";
import {Doctor} from "../../_models/doctor";


@Component({
    providers: [DoctorService],
    templateUrl: './visitsCalendar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./visitsCalendar.component.scss']
})
export class VisitsCalendarComponent implements OnInit {
    @ViewChild('visitModal') modal: ModalComponent;

    public id: string;

    constructor( private route: ActivatedRoute, private doctorService: DoctorService) {

    }

    doctor:Doctor;

    patientFirstName:string;

    patientLastName:string;


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

    events: CalendarEvent[];

    reloadEvents(){

        //TODO tu powinno być this.events = <wizyty z endpointa>

        this.events =  [{
            title: 'Click me',
            color: this.colors.yellow,
            start: new Date()
        }, {
            title: 'Or click me',
            color: this.colors.blue,
            start: new Date()
        }];
    }

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

    modalClosed(){
        alert("Pacjent to "+this.patientFirstName+" "+this.patientLastName);

        //TODO tutaj powinno wywołanie endpointa do zapisania wizyty

        this.modal.close();
        this.reloadEvents();
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
        this.route.params.subscribe(params => {
            this.id = params['doctorId']; // (+) converts string 'id' to a number
            // alert("mam id "+this.id);
            this.doctor = this.doctorService.getById(this.id);
            this.reloadEvents();
        });


    }




}
