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

@Component({
    providers: [DoctorService, PatientService, AppointmentService, TimeSlotService],
    templateUrl: './visitList.component.html',
    styleUrls: ['./visitList.component.scss']
})
export class VisitListComponent implements OnInit {
    constructor(private route: ActivatedRoute,
        private doctorService: DoctorService,
        private patientService: PatientService,
        private appointmentService: AppointmentService,
        private timeSlotService: TimeSlotService,
        private authService: AuthenticationService,
        private router: Router) {
    }


    patientMode: boolean //patient or doctor

    headers: string[]
    patientHeaders: string[] = ["Date", "Doctor", "Office number", "Appointment page"]
    doctorHeaders: string[] = ["Date", "Patient", "Priority", "Reason", "Office Id", "Appointment page"]
    doctor: Doctor
    patient: Patient

    private startDate: Date = new Date();
    private endDate: Date = this.initEndDate()
    private initEndDate(): Date {
        var date = new Date();
        date.setDate(this.startDate.getDate() + 6)
        return date
    }

    private debugMode = true //Celowo zostawiam to w kodzie żeby za każdym razem nie dodawać jak coś trzeba pooprawić

    private allTheData: Appointment[]

    private toShow: Appointment[]

    private toShowStr: string[][]

    private config: FieldConfig[] = [{
        type: 'date',
        label: 'Start Date-time',
        name: 'startDateTime',
    },
    {
        type: 'date',
        label: 'End Date-time',
        name: 'endDateTime',
    },
    {
        label: 'Submit',
        name: 'submit',
        type: 'button'
    }]

    ngOnInit() {
        this.patientMode = AuthenticationService.ROLE_PATIENT == this.authService.getRole();
        console.log("INIT VISIT LIST")
        if (this.debugMode) {
            this.patientMode = false;
            this.headers = this.doctorHeaders
            this.doctorService.getById("1").subscribe(patient => {
                this.doctor = patient
                this.refresh()
            })
        } else {
            if (this.patientMode) {
                this.headers = this.patientHeaders

                this.patientService.getPatientByEmail(this.authService.getEmail())
                    .subscribe(patient => {
                        this.patient = patient
                        this.refresh()
                    })
            } else {
                this.headers = this.doctorHeaders
                this.doctorService.getDoctorByEmail(this.authService.getEmail())
                    .subscribe(doctor => {
                        this.doctor = doctor
                        this.refresh()
                    })
            }
        }
    }

    ///////////////////////////////////
    //return is nullable
    private getAppointment(slot: TimeSlot): Observable<Appointment> {
        return this.appointmentService.getByTimeSlot(slot.id)
            .map((appointment: Appointment) => {
                console.log("jest app dla id" + slot.id)
                return appointment
            })
            .catch((err) => {
                console.log("Nie ma app dla id " + slot.id)
                return Observable.of(null);
            })
    }

    refresh(): void {
        this.startDate.setHours(0, 0, 0, 0);
        this.endDate.setHours(23, 59, 59, 999);
        console.log("ODŚWIEŻAM")
        this.doctorService.getAll().subscribe(doctors => {
            let appointmentsOfEachDoctor: Observable<Appointment[]>[] =
                doctors.map(doctor => {
                    let timeSlots: Observable<TimeSlot[]> = this.timeSlotService
                        .getTimeSlots(doctor, this.startDate, this.endDate);
                    let appointmetsObs: Observable<Appointment[]> = timeSlots.flatMap((slots: TimeSlot[]) => {
                        let appointments: Observable<Appointment>[] =
                            slots.map(slot => this.getAppointment(slot))
                        return Observable.forkJoin(appointments)
                    })
                    return appointmetsObs
                })
            let coTuSiexD: Observable<Appointment[]> =
                Observable.forkJoin(appointmentsOfEachDoctor).flatMap(x => x)

            coTuSiexD
                .subscribe((xd: Appointment[]) => {
                    this.allTheData = xd.filter(x=>x!=null)
                    console.log(this.allTheData)
                    this.allTheData.sort((s1, s2) => {
                        console.log(s1)
                        if (s1.timeSlot.endDateTime.getTime() < s2.timeSlot.endDateTime.getTime()) {
                            return -1;
                        } else if (s1.timeSlot.endDateTime.getTime() > s2.timeSlot.endDateTime.getTime()) {
                            return 1;
                        } else {
                            return 0;
                        }
                    })
                    this.formatDataToShow()
                })
        })
    }

    routeToVisitPage(row: string[]) {
        let rowNum: number = this.toShowStr.indexOf(row)
        let appointment = this.toShow[rowNum]
        console.log('Wysyłam cię do appointmentId=' + appointment.id)
        this.router.navigate(['/pages/TODO' + appointment.id]) //TODO URL!!!!
    }

    private displayDate(start: Date, end: Date): string {
        return start.getDate() + "." + (start.getMonth() + 1) + "\u00A0" +
            start.getHours() + ":" + this.safeMinutes(start.getMinutes())
            + "\u00A0-\u00A0" + end.getHours() + ":" + this.safeMinutes(end.getMinutes())
    }

    private safeMinutes(minute: number): string {
        let str: string = minute + ""
        if (str.length == 1) {
            return "0" + str;
        } else {
            return str;
        }
    }

    private formatOfficeNum(appointment: Appointment): string {
        if (appointment.officeNumber == null) {
            return "unknown"
        } else {
            return appointment.officeNumber + ""
        }
    }


    formatDataToShow() {
        console.log("Zyjem")
        if (this.patientMode) {
            this.toShow = this.allTheData.filter((a: Appointment) => this.patient.id == a.patient.id)
            this.toShowStr = this.toShow.map((a: Appointment) => {
                return [this.displayDate(a.timeSlot.startDateTime, a.timeSlot.endDateTime),
                a.timeSlot.doctor.firstName + "\u00A0" + a.timeSlot.doctor.lastName, this.formatOfficeNum(a)]
            })
        } else {
        console.log("Zyjem2")        
            this.toShow = this.allTheData.filter((a: Appointment) => this.doctor._id == a.timeSlot.doctor._id)
        console.log("Zyjem3")        
            this.toShowStr = this.toShow.map((a: Appointment) => {
                return [this.displayDate(a.timeSlot.startDateTime, a.timeSlot.endDateTime),
                a.patient.account.personalDetails.firstName + "\u00A0" + a.patient.account.personalDetails.lastName,
                a.priority, a.data, this.formatOfficeNum(a)]
            })
        }
        console.log(this.toShowStr)
    }

    private changeTimeRange(event): void {
        if (event.startDateTime != undefined && event.endDateTime != undefined) {
            var start = event.startDateTime
            var end = event.endDateTime
            if (!start.includes(":")) { //hacks to make our date-picker work(((
                start = start + " 10:10"
            }
            if (!end.includes(":")) {
                end = end + " 10:10"
            }
            this.startDate = new Date(start)
            this.endDate = new Date(end)
            this.refresh()
        }
    }
}        