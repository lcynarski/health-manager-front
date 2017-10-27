import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarEvent } from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { ModalComponent } from 'ng2-bs4-modal/ng2-bs4-modal';
import { DoctorService } from "../../_services/doctor.service";
import { Doctor } from "../../_models/doctor";
import { Patient } from "../../_models/patient";
import { TimeSlot } from "../../_models/timeslot";
import { CreateTimeslotComponent } from "../../pages/createTimeslot";
import { PatientService } from "../../_services/patient.service";
import { AppointmentService } from "../../_services/appointment.service";
import { TimeSlotService } from "../../_services/timeSlot.service";
import { Appointment } from "../../_models/appointment";
import { AuthenticationService } from '../../_services/authentication.service';
import { Observable } from "rxjs/Observable";

import { FieldConfig } from '../../components/dynamic-form/models/field-config.interface';

interface VisitEvent extends CalendarEvent {
    slotId: number;
    availableForSelfSign: boolean;
    patient?: Patient; // nullæ jak termin nie zarezerwowany
    appointmentId?: number; // nullæ jak termin nie zarezerwowany
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

        this.createTimeSlotComponent = new CreateTimeslotComponent(router, doctorService)
    }

    createTimeSlotComponent: CreateTimeslotComponent

    config: FieldConfig[];

    doctor: Doctor;

    patient: Patient; //used for communication with `onClick` functions (albo też `ja` jeśli obecna rola to pacjent)

    patientName: string;

    patients: Patient[];

    currentSlotId: number;

    currentSlotTaken: boolean;

    view: string = 'month';

    viewDate: Date = new Date();

    userRole: string

    imAPatient: boolean

    showSlotMoveMenu: boolean = false

    data: string = "Reason of visit" //powód wizyty itp 

    priority: string = Appointment.PRIORITY_NORMAL; //domyślnie, np kiedy pacjent się sam rejestruje

    moveSlotErr: boolean = false

    priorities = [
        { id: Appointment.PRIORITY_LOW, name: 'Low' },
        { id: Appointment.PRIORITY_NORMAL, name: 'Normal' },
        { id: Appointment.PRIORITY_HIGH, name: 'High' }
    ];

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

    reloadEvents() {
        //zawsze zaciągamy miesiąc - nawet jak patrzymy na tydzień/dzień (tak prościej :P)
        var viewStart = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), 1);
        var viewEnd = new Date(this.viewDate.getFullYear(), (this.viewDate.getMonth() + 1) % 12, 1);

        this.timeSlotService.getTimeSlots(this.doctor, viewStart, viewEnd)
            .subscribe(slots => {
                const eventsTmp: VisitEvent[] = slots.map((slot) => {
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
                        .catch((err: any) => Observable.of([event, null as Appointment])));

                const self = this;
                Observable.forkJoin(observables)
                    .subscribe((dataArray: Array<[VisitEvent, Appointment]>) => {
                        self.events = dataArray.map(([event, appointment]: [VisitEvent, Appointment]) => {
                            if (appointment === null) {
                                if (event.availableForSelfSign || !self.imAPatient) {
                                    event.color = self.colors.blue
                                    return event;
                                } else {
                                    return null;
                                }
                            } else {
                                if (!self.imAPatient || appointment.patient.id === self.patient.id) {
                                    event.patient = appointment.patient
                                    event.appointmentId = appointment.id;
                                    event.color = self.colors.red;
                                    return event;
                                } else {
                                    return null;
                                }
                            }
                        }).filter((ev) => ev != null);
                    });
            });
    }

    locale: string = 'en';

    modalDate: string;
    modalTime: string;

    eventClicked({ event }: { event: CalendarEvent }): void {
        this.showSlotMoveMenu = false;
        console.log('Przed ' + this.showSlotMoveMenu);
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

    enrollMe() {
        console.log('Enrolling myself:')
        console.log(this.patient)
        this.setPatient(this.patient);
    }


    displaySlotMoveMenu(event) {
        this.showSlotMoveMenu = true;
    }

    setPatient(p: Patient) {
        this.patient = p;
        var appointmentData = {
            timeSlotId: this.currentSlotId,
            tookPlace: false,
            officeNumber: null, //TODO jak wypełnić
            data: this.data,
            priority: this.priority
        };
        for (var event of this.events) {
            if (event.slotId == this.currentSlotId) {
                event.color = this.colors.red;
                event.patient = p;
                break;
            }
        }
        this.appointmentService.saveAppointment(this.patient.id, appointmentData)
            .subscribe(appointment => this.modalClosed())
    }

    modalClosed() {
        this.moveSlotErr = false
        this.showSlotMoveMenu = false;
        this.modal.close();
        this.reloadEvents();
    }

    // moves also Appointment if necessary
    moveTimeSlot(value) {
        if (value.startDateTime != undefined && value.endDateTime != undefined) {
            var docId
            if (value.doctor == undefined || this.createTimeSlotComponent.docIdByName[value.doctor] == undefined) {
                docId = this.id
            } else {
                docId = this.createTimeSlotComponent.docIdByName[value.doctor]
            }
            this.timeSlotService.moveTimeSlot(docId, this.currentSlotId,
                new Date(value.startDateTime), new Date(value.endDateTime))
                .catch(err => {
                    this.moveSlotErr = true
                    return null;
                }).subscribe(res => {
                    if (res != null) {
                        this.modalClosed()
                    }
                })
        }
    }

    unEnroll() {
        let appointmentId = this.events.filter(event => event.slotId == this.currentSlotId)[0].appointmentId
        console.log("Usuwam rezerwację o id: " + appointmentId)
        this.appointmentService.removeAppointment(appointmentId)
            .subscribe(appointment => this.modalClosed())
    }

    ngOnInit() {
        this.createTimeSlotComponent.ngOnInit()
        let moveSlotConfig = this.createTimeSlotComponent.config
            .filter(field => field.name != "availableForSelfSign")//self-sign ability donesn't change
        this.userRole = this.authService.getRole();
        console.log('My role is ' + this.userRole)
        if (this.userRole == AuthenticationService.ROLE_ADMIN) {
            this.config = moveSlotConfig
        } else if (this.userRole == AuthenticationService.ROLE_DOCTOR) {
            this.config = moveSlotConfig.filter(field => field.name != 'doctor') //no doctor choice
        } else {
            this.config = null
        }
        this.imAPatient = this.userRole === AuthenticationService.ROLE_PATIENT;

        this.route.params.subscribe(params => {
            this.id = params['doctorId']; // (+) converts string 'id' to a number

            this.doctorService.getById(this.id).subscribe(doc => {
                console.log("przyszło coś z promisa");
                console.log(doc);
                this.doctor = doc;
                console.log(this.doctor);

                if (this.imAPatient) {
                    this.patientService/*.getById('1')*/ // włączyć dla łatwiejszej prezentacji
                        .getPatientByEmail(this.authService.getEmail()).subscribe((patient) => {
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

