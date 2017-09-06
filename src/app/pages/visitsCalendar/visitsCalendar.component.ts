import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CalendarEvent} from 'angular-calendar';
import {EventColor} from 'calendar-utils';
import {ModalComponent} from 'ng2-bs4-modal/ng2-bs4-modal';
import {DoctorService} from "../../_services/doctor.service";
import {Doctor} from "../../_models/doctor";
import {Patient} from "../../_models/patient";
import {PersonalDetails} from "../../_models/personalDetails";
import {PatientService} from "../../_services/patient.service";
import {AppointmentService} from "../../_services/appointment.service";
import {TimeSlotService} from "../../_services/timeSlot.service";
import {Appointment} from "../../_models/appointment";
import {AuthenticationService} from '../../_services/authentication.service';
import {Observable} from "rxjs/Observable";


interface VisitEvent extends CalendarEvent {
    slotId: number;
    patient?: Patient; // null jak termin nie zarezerwowany
    availableForSelfSign: boolean;
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
                private authService: AuthenticationService,
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

    userRole: string

    imAPatient: boolean

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
                const eventsTmp: VisitEvent[] = slots./*filter((slot) => //todo co z zarejestrowanymi w recepcji na tego pacjenta?
                    !this.imAPatient || slot.availableForSelfSign).*/map((slot) => {
                    return {
                        slotId: slot.id,
                        title: "Visit",
                        start: new Date(slot.startDateTime),
                        end: new Date(slot.endDateTime),
                        color: this.colors.blue,
                        availableForSelfSign: slot.availableForSelfSign
                    }
                })


                const observables: Array<Observable<[VisitEvent, Appointment]>> =
                    eventsTmp.map((event) => this.appointmentService.getByTimeSlot(event.slotId)
                        .map((appintment: Appointment) => [event, appintment])
                        .catch((err: any) => {
                            console.log('ZŁAPAŁEM :DDD')
                            console.log(err)
                            return Observable.of([event, null as Appointment]);
                        }))

                console.log('yolo')
                console.log(eventsTmp)

                const self = this;
                Observable.forkJoin(observables)
                    .subscribe((dataArray: Array<[VisitEvent, Appointment]>) => {
                        console.log('udało się?')
                        console.log(dataArray)
                        self.events = dataArray.map(([ev, app]: [VisitEvent, Appointment]) => {
                            if (app === null) {
                                console.log('appointment to null a event to');
                                console.log(ev);
                                if (ev.availableForSelfSign || !self.imAPatient) {
                                    ev.color = self.colors.blue
                                    return ev;
                                } else {
                                    return null;
                                }
                            } else {

                                console.log('JEST OK!!!');
                                console.log(app);
                                console.log(ev);
                                if (!self.imAPatient || app.patient.id === self.patient.id) {
                                    ev.color = self.colors.red;
                                    return ev;
                                } else {
                                    return null;
                                }
                            }
                        }).filter((ev) => ev != null);
                        // All observables in `observables` array have resolved and `dataArray` is an array of result of each observable
                    });
                // //mamy terminy, teraz sprawdzamy które są zajęte!
                // for (var event of this.events) {
                //     this.updateTimeSlotAvailability(event)
                // }
            })
    }

    locale: string = 'en';

    modalDate: string;
    modalTime: string;

    eventClicked({event}: { event: CalendarEvent }): void {
        console.log('Przed');
        console.log(this.patients);
        this.modalDate = event.start.toLocaleDateString();
        this.modalTime = event.start.toLocaleTimeString().substring(0, 5);
        console.log(event);

        var visitEvent: VisitEvent = (event as VisitEvent)
        this.currentSlotId = visitEvent.slotId;
        this.currentSlotTaken = visitEvent.patient != null
        if (!this.imAPatient) {
            this.patient = visitEvent.patient;
        }
        this.modal.open();
    }

    showPatientDetails() {
        this.router.navigate(['/pages/patientDetails/' + this.patient.id]);
    }

    enroll() {
        console.log('Zapisujem xDDDD')
        console.log(this.patient)
        this.setPatient(this.patient);
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
        this.userRole = this.authService.getRole();
        console.log('My role is ' + this.userRole)
        this.imAPatient = this.userRole === AuthenticationService.ROLE_PATIENT;

        this.route.params.subscribe(params => {
            this.id = params['doctorId']; // (+) converts string 'id' to a number


            this.doctorService.getById(this.id).subscribe(doc => {
                    console.log("przyszło coś z promisa");
                    console.log(doc);
                    this.doctor = doc;
                    console.log(this.doctor);

                    if (this.imAPatient) {
                        this.patientService.getById('1')/*getPatientByEmail(this.authService.getEmail())*/.subscribe((patient) => {
                            this.patient = patient;
                            this.reloadEvents();
                        });
                    } else {
                        this.reloadEvents();
                    }
                }
            );

            if (!this.imAPatient) {
                this.loadAllPatients();
                console.log("są pacjenci");
                this.patientName = "Wybierz pacjenta";
            }
        });


    }
}

