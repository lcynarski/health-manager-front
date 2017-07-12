import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {  ChangeDetectionStrategy } from '@angular/core';
import { CalendarEvent, CalendarDateFormatter } from 'angular-calendar';
import { ModalComponent } from 'ng2-bs4-modal/ng2-bs4-modal';
import {DoctorService} from "../../_services/doctor.service";
import {Doctor} from "../../_models/doctor";
import {Patient} from "../../_models/patient";
import {PatientService} from "../../_services/patient.service";
import {AppConfig} from "../../app.config";


interface VisitEvent extends CalendarEvent{
    slotId:string;
}

@Component({
    providers: [DoctorService, PatientService],
    templateUrl: './visitsCalendar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./visitsCalendar.component.scss']
})
export class VisitsCalendarComponent implements OnInit {
    @ViewChild('visitModal') modal: ModalComponent;

    public id: string;

    constructor( private route: ActivatedRoute,
                 private http: Http,
                 private config: AppConfig,
                 private doctorService: DoctorService, private patientService: PatientService) {

    }

    doctor: Doctor;

    patient: Patient;

    patientName: string;

    patients: Patient[];

    currentSlotId:string;


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

    events: VisitEvent[];

    private loadAllPatients() {
        this.patientService.getPatients().subscribe( (patients) => { this.patients = patients; });
    }

    reloadEvents(){

        this.http.get(`${this.config.apiUrl}/doctors${this.id}/slots`)
            .map((response: Response) => response.json())
            .subscribe(slots => {this.events = slots});

        this.events =  [{
            slotId:"3",
            title: 'Wizyta',
            color: this.colors.yellow,
            start: new Date()
        }, {
            slotId:"4",
            title: 'Wizyta',
            color: this.colors.blue,
            start: new Date()
        }];
    }

    locale: string = 'pl';

    modalDate:string;
    modalTime:string;


    eventClicked({event}: {event: CalendarEvent}): void {
        console.log('Przed');
        console.log(this.patients);
        this.modalDate = event.start.toLocaleDateString();
        this.modalTime = event.start.toLocaleTimeString().substring(0,5);
        console.log(event);

        this.currentSlotId = (event as VisitEvent).slotId;

        this.modal.open();

        console.log("Po");
    }

    setPatient(p:Patient){
        this.patient = p;
        // alert("id to " + this.patient);
        // /doctors/{doctorId}/slots/{slotId}/taken_by
        var slotId = "5";
        this.http.post(this.config.apiUrl + '/doctors/'+this.id+'/slots/'+this.currentSlotId+'/taken_by', p._id);
        this.modalClosed();
    }

    modalClosed(){
        // alert("Pacjent to "+this.patient);

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
            this.doctorService.getById(this.id).subscribe(doc => {this.doctor = doc});
            this.reloadEvents();
            this.loadAllPatients();
            console.log("są pacjenci");
            this.patientName = "Wybierz pacjenta";
        });


    }




}
