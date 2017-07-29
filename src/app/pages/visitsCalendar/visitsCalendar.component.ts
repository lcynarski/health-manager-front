import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CalendarEvent} from 'angular-calendar';
import {ModalComponent} from 'ng2-bs4-modal/ng2-bs4-modal';
import {DoctorService} from "../../_services/doctor.service";
import {Doctor} from "../../_models/doctor";
import {Patient} from "../../_models/patient";
import {PatientService} from "../../_services/patient.service";
import {AppointmentService} from "../../_services/appointment.service";


interface VisitEvent extends CalendarEvent{
    slotId:string;
}

@Component({
    providers: [DoctorService, PatientService, AppointmentService],
    templateUrl: './visitsCalendar.component.html',
    styleUrls: ['./visitsCalendar.component.scss']
})
export class VisitsCalendarComponent implements OnInit {
    @ViewChild('visitModal') modal: ModalComponent;

    public id: string;

    constructor(private route: ActivatedRoute,
                private doctorService: DoctorService,
                private patientService: PatientService,
                private appointmentService: AppointmentService) {

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

        // this.http.get(`${this.config.apiUrl}/doctors/${this.id}/slots`)
        //     .map((response: Response) => response.json())
        //     .subscribe(slots => {this.events = slots});

        this.events =  [{
            slotId:"3",
            title: 'Visit',
            color: this.colors.yellow,
            start: new Date()
        }, {
            slotId:"4",
            title: 'Visit',
            color: this.colors.blue,
            start: new Date()
        }];
    }

    locale: string = 'en';

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
        var appointmentData = {
            timeSlotId: Number(this.currentSlotId),
            tookPlace: false,
            officeNumber: null, //TODO jak wypełnić
            data: "Jak będą formularze to tu coś będzie"
        };
        this.appointmentService.saveAppointment(this.patient.id, appointmentData)
        console.log(appointmentData)

        this.modalClosed();
    }

    modalClosed(){
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


            this.doctorService.getById(this.id).subscribe(doc => {
                console.log("przyszło coś z promisa");
                console.log(doc);
                this.doctor = doc;
                console.log(this.doctor);
                this.reloadEvents();
            });

            this.loadAllPatients();
            console.log("są pacjenci");
            this.patientName = "Wybierz pacjenta";
        });


    }
}
