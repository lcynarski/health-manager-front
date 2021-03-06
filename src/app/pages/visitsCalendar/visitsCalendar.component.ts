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
import { GoogleCalendarService } from '../../_services/googleCalendar.service';
import { PatientsDataSource } from "../patientsList/patientsDataSource";
import {TranslateService} from "@ngx-translate/core";

interface VisitEvent extends CalendarEvent {
    slotId: number;
    availableForSelfSign: boolean;
    patient?: Patient; // nullæ jak termin nie zarezerwowany
    appointmentId?: number; // nullæ jak termin nie zarezerwowany
}

@Component({
    providers: [DoctorService, PatientService, AppointmentService, TimeSlotService, TranslateService],
    templateUrl: './visitsCalendar.component.html',
    styleUrls: ['./visitsCalendar.component.scss']
})
export class VisitsCalendarComponent implements OnInit {
    @ViewChild('visitModal') modal: ModalComponent;

    public id: string;
    dataSource: PatientsDataSource;
    columnsToDisplay = [];

    constructor(private route: ActivatedRoute,
        private doctorService: DoctorService,
        private patientService: PatientService,
        private appointmentService: AppointmentService,
        private timeSlotService: TimeSlotService,
        private googleCalendarService: GoogleCalendarService,
        private authService: AuthenticationService,
        private translationService: TranslateService,
        private router: Router) {

        this.createTimeSlotComponent = new CreateTimeslotComponent(router, doctorService);

        this.columnsToDisplay = ['firstName', 'lastName', 'chooseForVisit'];
    }

    createTimeSlotComponent: CreateTimeslotComponent;

    config: FieldConfig[];

    doctor: Doctor;

    patient: Patient; //used for communication with `onClick` functions (albo też `ja` jeśli obecna rola to pacjent)

    patientName: string;

    patients: Patient[];

    currentSlotId: number;

    currentSlotTaken: boolean;

    currentEndDate: Date;

    currentStartDate: Date;

    view: string = 'month';

    viewDate: Date = new Date();

    userRole: string;

    imAPatient: boolean;
    imAReceptionist: boolean;

    showSlotMoveMenu: boolean = false;

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
            this.dataSource = new PatientsDataSource(patients);
        });
    }

    private slotToVisitEvent(slot: TimeSlot): VisitEvent {

        var title;
        if(this.translationService.currentLang === 'pl' ){
            title = "Wolny termin";
        }else{
            title = "Free Timeslot";
        }

        return {
            slotId: slot.id,
            title: title ,
            start: new Date(slot.startDateTime),
            end: new Date(slot.endDateTime),
            color: this.colors.blue,
            availableForSelfSign: slot.availableForSelfSign
        };
    }

    private doSomethingWojtekKnowsWhat([event, appointment]: [VisitEvent, Appointment]): VisitEvent {
        if (appointment === null) {
            // wizyta niezarezerwowana && nie jesteś pacjentem - pokazujemy
            // wizyta niezarezerwowana && jest self sign - pokazujemy
            // wizyta niezarezerwowana && jesteś pacjentem ale nie ma self sign - nie pokazujemy

            if (event.availableForSelfSign || !this.imAPatient) {
                event.color = this.colors.blue;
                return event;
            } else {
                return null;
            }
        } else {
            // wizyta zarezerwowana na bieżącego pacjenta - pokazujemy
            // wizyta zarezerwowana nie na bieżącego pacjenta - nie pokazujemy
            // wizyta zarezerwowana i bieżący pacjent jest nieustawiony - pokazujemy
            if (!this.isInSinglePatientMode() || appointment.patient.id === this.patient.id) {
                event.patient = appointment.patient;
                event.appointmentId = appointment.id;
                event.color = this.colors.red;
                this.setEventTitle(event);
                return event;
            } else {
                return null;
            }
        }
    }

    setEventTitle(event: VisitEvent): VisitEvent {
        let doctorFullName = this.doctor.firstName + " " + this.doctor.lastName;
        let patient: Patient = event.patient;
        var patientFullName;
        if (patient.account != undefined && patient.account != null) {
            patientFullName = patient.account.personalDetails.firstName + " " + patient.account.personalDetails.lastName;
        } else {
            let patientBackup: any = patient //znowu różne pacjenty :(            
            if (patientBackup.firstName != undefined && patientBackup.lastName != undefined) {
                patientFullName = patientBackup.firstName + " " + patientBackup.lastName;
            } else {
                patientFullName = "Patient";
            }
        }
        if (this.authService.isPatient()) {
            event.title = doctorFullName;
        } else if (this.authService.isDoctor()) {
            event.title = patientFullName;
        } else if (this.authService.isReceptionist()) {
            event.title = doctorFullName + " - " + patientFullName;
        }
        console.log("Ustawiłem nazwę dla wydarzenia o slotId " + event.slotId + " na " + event.title)
        return event;
    }
    reloadEvents() {
        //zawsze zaciągamy miesiąc - nawet jak patrzymy na tydzień/dzień (tak prościej :P)
        var viewStart = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), 1);

        var viewEnd;
        if ((this.viewDate.getMonth() + 1) % 12 != 0) {
            viewEnd = new Date(this.viewDate.getFullYear(), (this.viewDate.getMonth() + 1) % 12, 1);
        } else {
            viewEnd = new Date(this.viewDate.getFullYear() + 1, (this.viewDate.getMonth() + 1) % 12, 1);
        }
        this.timeSlotService.getTimeSlots(this.doctor, viewStart, viewEnd)
            .subscribe(slots => {

                const eventsTmp: VisitEvent[] = slots.map((slot) => {
                    return this.slotToVisitEvent(slot);
                });


                const observables: Array<Observable<[VisitEvent, Appointment]>> =
                    eventsTmp.map((event) => this.appointmentService.getByTimeSlot(event.slotId)
                        .map((appintment: Appointment) => [event, appintment])
                        .catch((err: any) => Observable.of([event, null as Appointment])));

                const self = this;
                Observable.forkJoin(observables)
                    .subscribe((dataArray: Array<[VisitEvent, Appointment]>) => {
                        self.events = dataArray.map(([event, appointment]: [VisitEvent, Appointment]) => {
                            return this.doSomethingWojtekKnowsWhat([event, appointment]);
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

        var visitEvent: VisitEvent = (event as VisitEvent);
        this.currentSlotId = visitEvent.slotId;
        this.currentSlotTaken = visitEvent.patient != null;
        this.currentStartDate = visitEvent.start;
        this.currentEndDate = visitEvent.end;

        if (!this.isInSinglePatientMode()) {
            this.patient = visitEvent.patient;
        }
        this.modal.open();
    }

    showPatientDetails() {
        this.router.navigate(['/pages/patientDetails/' + this.patient.id]);
    }

    enrollMe() {
        console.log('Enrolling myself:');
        console.log(this.patient);
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
                this.setEventTitle(event);
                break;
            }
        }
        this.appointmentService.saveAppointment(this.patient.id, appointmentData)
            .subscribe(appointment => this.modalClosed());
    }

    modalClosed() {
        this.moveSlotErr = false;
        this.showSlotMoveMenu = false;
        this.modal.close();
        this.reloadEvents();
    }

    // moves also Appointment if necessary
    moveTimeSlot(value) {
        if (value.startDateTime != undefined && value.endDateTime != undefined) {
            var docId
            if (value.doctor == undefined || this.createTimeSlotComponent.docIdByName[value.doctor] == undefined) {
                docId = this.id;
            } else {
                docId = this.createTimeSlotComponent.docIdByName[value.doctor];
            }
            this.timeSlotService.moveTimeSlot(docId, this.currentSlotId,
                new Date(value.startDateTime), new Date(value.endDateTime))
                .catch(err => {
                    this.moveSlotErr = true;
                    return null;
                }).subscribe(res => {
                    if (res != null) {
                        this.modalClosed();
                    }
                });
        }
    }

    unEnroll() {
        let appointmentId = this.events.filter(event => event.slotId == this.currentSlotId)[0].appointmentId
        console.log("Usuwam rezerwację o id: " + appointmentId);
        this.appointmentService.removeAppointment(appointmentId)
            .subscribe(appointment => this.modalClosed());
    }
    removeTimeSlot() {
        console.log("Usuwam termin o id: " + this.currentSlotId);
        this.timeSlotService.removeTimeSlot(this.currentSlotId)
            .subscribe(slot => {
                this.events = this.events.filter(e => e.slotId != this.currentSlotId)
                this.modalClosed()
            })
    }

    exportToGoogle() {
        let event = {
            startDateTime: this.currentStartDate,
            endDateTime: this.currentEndDate,
            doctor: this.doctor.firstName + " " + this.doctor.lastName
        }

        this.googleCalendarService.exportAppointment(event)
            .then(() => alert("Dodano wizytę do kalendarza Google"));
    }


    private initializeConfig() {
        let moveSlotConfig = [
            this.createTimeSlotComponent.config.filter(field =>
                field.name == "doctor")[0],
            {
                type: 'date',
                label: 'Start Date-time',
                name: 'startDateTime',
                //placeholder: 'Date-time'
            },
            {
                type: 'date',
                label: 'End Date-time',
                name: 'endDateTime',
                //placeholder: 'Date-time'
            },
            {
                label: 'Submit',
                name: 'submit',
                type: 'button'
            }
        ];
        if (this.userRole == AuthenticationService.ROLE_ADMIN) {
            this.config = moveSlotConfig;
        } else if (this.userRole == AuthenticationService.ROLE_DOCTOR) {
            this.config = moveSlotConfig.filter(field => field.name != 'doctor'); // no doctor choice
        } else {
            this.config = null;
        }
    }

    isInSinglePatientMode(): boolean {
        return this.imAPatient || this.imAReceptionist;
    }

    ngOnInit() {
        this.createTimeSlotComponent.ngOnInit();
        this.userRole = this.authService.getRole();
        console.log('My role is ' + this.userRole);
        this.initializeConfig();

        this.imAPatient = this.authService.isPatient();

        this.route.params.subscribe(params => {
            this.id = params['doctorId']; // (+) converts string 'id' to a number

            this.doctorService.getById(this.id).subscribe(doc => {
                this.doctor = doc;

                let patientId = params['patientId'];

                if (patientId) {
                    this.imAReceptionist = true;
                    this.patientService.getById(patientId).subscribe((patient) => {
                        this.patient = patient;
                        this.reloadEvents();
                    });
                } else if (this.imAPatient) {
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

            if (!this.isInSinglePatientMode()) {
                this.loadAllPatients();
                this.patientName = "Wybierz pacjenta";
            }
        });


    }
}

