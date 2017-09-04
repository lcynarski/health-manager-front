import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarEvent } from 'angular-calendar';
import { EventColor } from 'calendar-utils';
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
    slotId: number;
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

    currentSlotId: number;

    currentSlotTaken: boolean;

    view: string = 'month';

    viewDate: Date = new Date();

    colors: { [s: string]: EventColor; } = {
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

    private updateTimeSlotAvailability(event: VisitEvent) {
        this.appointmentService.getByTimeSlot(event.slotId)
            .subscribe((appointment: Appointment) => {
                if (appointment != undefined && appointment != null) {
                    event.color = this.colors.red
                    event.patient = appointment.patient
                    var patientDetails: PersonalDetails = appointment.patient.account.personalDetails
                    event.title = patientDetails.firstName + ' ' + patientDetails.lastName
                }
            })
    }

    reloadEvents() {
        //zawsze zaciągamy miesiąc - nawet jak patrzymy na tydzień/dzień (tak prościej :P)
        var viewStart = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), 1);
        var viewEnd = new Date(this.viewDate.getFullYear(), (this.viewDate.getMonth() + 1) % 12, 1);

        this.timeSlotService.getTimeSlots(this.doctor, viewStart, viewEnd)
            .subscribe(slots => {
                this.events = slots.filter((slot) => slot.availableForSelfSign).map((slot) => {
                    return {
                        slotId: slot.id,
                        title: "Visit",
                        start: new Date(slot.startDateTime),
                        end: new Date(slot.endDateTime),
                        color: this.colors.blue
                    }
                })
                //mamy terminy, teraz sprawdzamy które są zajęte!
                for (var event of this.events) {
                    this.updateTimeSlotAvailability(event)
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
            timeSlotId: this.currentSlotId,
            tookPlace: false,
            officeNumber: null, //TODO jak wypełnić
            data: "Jak będą formularze to tu coś będzie"
        };
        for (var event of this.events) {
            if (event.slotId == this.currentSlotId) {
                event.color = this.colors.red;
                break;
            }
        }
        this.appointmentService.saveAppointment(this.patient.id, appointmentData);

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
