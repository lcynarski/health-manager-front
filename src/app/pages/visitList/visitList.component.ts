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

    private allTheData:[Doctor, Patient, TimeSlot, Appointment][] 

    private toShow: [Doctor, Patient, TimeSlot, Appointment][] 

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

    refresh(): void {
        this.startDate.setHours(0, 0, 0, 0);
        this.endDate.setHours(23, 59, 59, 999);
        console.log("ODŚWIEŻAM")
        this.doctorService.getAll().subscribe(doctors => {
            let turboComboPre: Observable<[Doctor, Patient, TimeSlot, Appointment][]>[] =
                doctors.map(doctor => {
                    let timeSlots: Observable<TimeSlot[]> = this.timeSlotService
                        .getTimeSlots(doctor, this.startDate, this.endDate);
                    console.log("PRZED KONSTRUKCJĄ ABC")
                    let abc: Observable<[Doctor, Patient, TimeSlot, Appointment][]> =
                        timeSlots.flatMap((slots: TimeSlot[]) => {
                            console.log("PRZED KONSTRUKCJĄ QQQ")
                            let qqq: Observable<[Doctor, Patient, TimeSlot, Appointment]>[] =
                                slots.map(slot => {
                                    console.log("Ogarniam pojedynczy slot "+ slot.id)
                                    let qq: Observable<[Doctor, Patient, TimeSlot, Appointment]>
                                        = this.appointmentService.getByTimeSlot(slot.id)
                                            .map((appointment: Appointment) => {
                                                console.log("jest app dla id"+ slot.id)
                                                let res: [Doctor, Patient, TimeSlot, Appointment] =
                                                    [doctor, appointment.patient, slot, appointment]
                                                return res
                                            })
                                            .catch((err) => {
                                                console.log("Nie ma app dla id "+slot.id)
                                                return Observable.of(null);
                                            })
                                            console.log("Ogarnołem pojedynczy slot" + slot.id)
                                    return qq;
                                })
                                console.log("Zkonstuowałem qqq!")
                            let qqqw: Observable<[Doctor, Patient, TimeSlot, Appointment][]> =
                             Observable.forkJoin(qqq).map(a => {
                                 console.log("PRZERZYŁEM")
                                 console.log(a)
                                 return a.filter(a => a!=null)
                             })
                             console.log("Zkonstuowałem qqqw!")
                            return qqqw;
                        })
                        console.log("Zkonstuowałem abc!")
                    return abc;
                })
            let coTuSiexD: Observable<[Doctor, Patient, TimeSlot, Appointment][]> =
                Observable.forkJoin(turboComboPre).flatMap(a => {
                    console.log("flatmap a "+ a)
                    return    a
            }
                )

                coTuSiexD
                .catch((e) => {
                    console.log("CO TU SIE")
                    console.log(e)
                    return null})
                .subscribe((xd:[Doctor, Patient, TimeSlot, Appointment][] ) => {
                    console.log("LOOOOL xDD")
                    console.log(xd)
                    this.allTheData = xd
                    this.allTheData.sort((s1,s2) => {
                        if(s1[2].endDateTime.getTime()<s2[2].endDateTime.getTime()){
                            return -1;
                        }else if(s1[2].endDateTime.getTime()>s2[2].endDateTime.getTime()){
                            return 1;
                        }else{
                            return 0;
                        }
                    })
                    this.ogarnijxD()
                })
            })
    }

coto(row: string[]){
    console.log("e")
    console.log(row) //jak teraz rozpozanć który to?
    let rowNum:number  = this.toShowStr.indexOf(row)
    console.log(rowNum)
    let the_row = this.toShow[rowNum]
    let appintmentId =the_row[3].id
    console.log('Wysyłam cię do appointmentId='+appintmentId)
    this.router.navigate(['/pages/eloelo'+ appintmentId]) //TODO URL!!!!
}

ogarnijxD(){
    if(this.patientMode){
        this.toShow = this.allTheData.filter(([d,p,s,a]: [Doctor, Patient, TimeSlot, Appointment]) => this.patient.id == p.id)
        
       this.toShowStr= this.toShow.map(([d,p,s,a]: [Doctor, Patient, TimeSlot, Appointment]) =>
                {
                    var officeNum:string
                    if(a.officeNumber==null){
                        officeNum="unknown:("
                    }else{
                        officeNum = a.officeNumber+""
                    }

                    return [s.startDateTime +" - "+s.endDateTime,d.firstName+" "+d.lastName,officeNum]
                })
    }else{
        this.toShow = this.allTheData.filter(([d,p,s,a]: [Doctor, Patient, TimeSlot, Appointment]) => this.doctor._id == d._id)
    
        this.toShowStr= this.toShow.map(([d,p,s,a]: [Doctor, Patient, TimeSlot, Appointment]) =>
        {
            var officeNum:string
            if(a.officeNumber==null){
                officeNum="unknown:("
            }else{
                officeNum = a.officeNumber+""
            }

            return [s.startDateTime +" - "+s.endDateTime,p.account.personalDetails.firstName+" "+p.account.personalDetails.lastName,
        a.priority,a.data,officeNum]
        })
    }
    console.log("Do pokazania")

    //test
    this.toShow[0][2].startDateTime
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