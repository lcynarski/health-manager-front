import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarEvent } from 'angular-calendar';
import { ModalComponent } from 'ng2-bs4-modal/ng2-bs4-modal';
import { DoctorService } from "../../_services/doctor.service";
import { Doctor } from "../../_models/doctor";
import { Patient } from "../../_models/patient";
import { PatientService } from "../../_services/patient.service";
import { AppointmentService } from "../../_services/appointment.service";
import { TimeSlotService } from "../../_services/timeSlot.service";
import { Appointment } from "../../_models/appointment";


interface VisitEvent extends CalendarEvent {
    slotId: string;
    patient?: Patient; //jak jest zarezerwowany todo rozwiązać lepiej
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

    patient: Patient;

    patientName: string;

    patients: Patient[];

    currentSlotId: string;

    currentSlotZarezerwowany: boolean;

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
        console.log(this.view)
        //zawsze zaciągamy miesiąc - nawet jak patrzymy na tydzień/dzień
        //todo: odświeżać je przy zmianie!
        var viewStart = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), 1);
        var viewEnd = new Date(this.viewDate.getFullYear(), (this.viewDate.getMonth() + 1) % 12, 0);
        console.log(viewStart)
        console.log(viewEnd)

        this.timeSlotService.getTimeSlots(this.doctor, viewStart, viewEnd)
            .subscribe(slots => {
                console.log("Przyszły terminy!")
                console.log(slots)
                var events = slots.map(slot => {
                    return {
                        slotId: slot.id,
                        title: "WIZYTA",
                        start: new Date(slot.startDateTime),
                        end: new Date(slot.endDateTime),
                        color: this.colors.blue //todo
                    }
                })
                console.log(events)
                this.events = events

                console.log(this.events)
                //mamy terminy, teraz sprawdzamy które są zajęte!
                for (var i = 0; i < events.length; i++) {
                    (function (event: VisitEvent, ths: VisitsCalendarComponent) {
                        console.log('Jade dla')
                        console.log(event)
                        ths.appointmentService.getByTimeSlot(event.slotId)
                            .subscribe((appointment: Appointment) => {
                                if (appointment === undefined || appointment == null || appointment.id == null) {
                                    console.log(i + 'Nie zarezerwowane: ' + event.slotId)
                                } else {
                                    console.log(i + 'ZAREZERWOWANE: ' + event.slotId)
                                    event.color = ths.colors.red
                                    event.patient = appointment.patient
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

        this.currentSlotId = (event as VisitEvent).slotId;
        this.currentSlotZarezerwowany = (event as VisitEvent).color == this.colors.red
        this.patient = (event as VisitEvent).patient//todo patient służy do kilku rzeczy
        this.modal.open();

        console.log("Po");
    }

    detale() {
        // this.modal.close();
        console.log('A teraz chciałbym was zabrać w podróż do ' + this.patient.id)
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
        this.appointmentService.saveAppointment(this.patient.id, appointmentData)
        console.log(appointmentData)

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
