import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarEvent } from 'angular-calendar';
import { ModalComponent } from 'ng2-bs4-modal/ng2-bs4-modal';
import { DoctorService } from "../../_services/doctor.service";
import { Doctor } from "../../_models/doctor";
import { Patient } from "../../_models/patient";
import { PersonalDetails } from "../../_models/personalDetails";
import { PatientService } from "../../_services/patient.service";
import { AppointmentService } from "../../_services/appointment.service";
import { TimeSlotService } from "../../_services/timeSlot.service";
import { Appointment } from "../../_models/appointment";


interface VisitEvent extends CalendarEvent {
    slotId: string;
    patient?: Patient; // null jak termin nie zarezerwowany
}

@Component({
    providers: [DoctorService, PatientService, AppointmentService, TimeSlotService],
    templateUrl: './visitsCalendar.component.html',
    styleUrls: ['./visitsCalendar.component.scss']
})
export class VisitsCalendarComponent implements OnInit {
    @ViewChild('visitModal') modal: ModalComponent;

    public id: string;

    constructor(private route: ActivatedRoute,
        private doctorService: DoctorService,
        private patientService: PatientService,
        private appointmentService: AppointmentService,
        private timeSlotService: TimeSlotService,
        private router: Router) {

    }

    doctor: Doctor;

    patient: Patient; //used for communication with `onClick` functions

    patientName: string;

    patients: Patient[];

    currentSlotId: string;

    currentSlotTaken: boolean;

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
        this.patientService.getPatients().subscribe((patients) => {
            this.patients = patients;
        });
    }

    reloadEvents() {
        //zawsze zaciągamy miesiąc - nawet jak patrzymy na tydzień/dzień (tak prościej :P)
        var viewStart = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), 1);
        var viewEnd = new Date(this.viewDate.getFullYear(), (this.viewDate.getMonth() + 1) % 12, 1);

        this.timeSlotService.getTimeSlots(this.doctor, viewStart, viewEnd)
            .subscribe(slots => {
                var events = slots.map(slot => {
                    return {
                        slotId: slot.id,
                        title: "Visit",
                        start: new Date(slot.startDateTime),
                        end: new Date(slot.endDateTime),
                        color: this.colors.blue
                    }
                })
                this.events = events

                //mamy terminy, teraz sprawdzamy które są zajęte!
                for (var i = 0; i < events.length; i++) {
                    (function (event: VisitEvent, self: VisitsCalendarComponent) { // w tej funkcji nie mam dostępu do `this`
                        self.appointmentService.getByTimeSlot(event.slotId)
                            .subscribe((appointment: Appointment) => {
                                if (appointment != undefined && appointment != null) {
                                    event.color = self.colors.red
                                    event.patient = appointment.patient
                                    var patientDetails: PersonalDetails = appointment.patient.account.personalDetails
                                    event.title = patientDetails.firstName + ' ' + patientDetails.lastName
                                }
                            })
                    })(this.events[i], this);
                }
            })
    }

    locale: string = 'en';

    modalDate: string;
    modalTime: string;


    eventClicked({ event }: { event: CalendarEvent }): void {
        console.log('Przed');
        console.log(this.patients);
        this.modalDate = event.start.toLocaleDateString();
        this.modalTime = event.start.toLocaleTimeString().substring(0, 5);
        console.log(event);

        var visitEvent: VisitEvent = (event as VisitEvent)
        this.currentSlotId = visitEvent.slotId;
        this.currentSlotTaken = visitEvent.patient != null
        this.patient = visitEvent.patient
        this.modal.open();
    }

    showPatientDetails() {
        this.router.navigate(['/pages/patientDetails/' + this.patient.id]);
    }

    setPatient(p: Patient) {
        this.patient = p;
        var appointmentData = {
            timeSlotId: Number(this.currentSlotId),
            tookPlace: false,
            officeNumber: null, //TODO jak wypełnić
            data: "Jak będą formularze to tu coś będzie"
        };
        var singletonArray = this.events.filter((ev) => { return ev.slotId == this.currentSlotId })
        if (singletonArray.length > 0) {
            singletonArray[0].color = this.colors.red
        }
        this.appointmentService.saveAppointment(this.patient.id, appointmentData)

        this.modalClosed();
    }

    modalClosed() {
        this.modal.close();
        this.reloadEvents();
    }


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
