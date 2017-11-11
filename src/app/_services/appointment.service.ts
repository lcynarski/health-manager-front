import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { TimeSlotService } from '../_services/timeSlot.service';
import { PatientService } from '../_services/patient.service';
import { AuthenticationService } from '../_services/index';
import { AppConfig } from '../app.config';
import { Appointment } from '../_models/appointment';
import { Doctor } from '../_models/doctor';
import { Patient } from '../_models/patient';

@Injectable()
export class AppointmentService {
    constructor(private http: Http,
                private authenticationService: AuthenticationService,
                private timeSlotService: TimeSlotService,
                private patientService: PatientService,
                private config: AppConfig) {
    }

    /** returns saved Appointment */
    public saveAppointment(patientId, appointmentData): Observable<Appointment> {
        return this.http.put(`${this.config.apiUrl}/patients/${patientId}/appointments`,
            appointmentData, this.authenticationService.addJwtOptions())
            .map((response: Response) => response.json());
    }

    /** returns removed appointment */
    public removeAppointment(appoinmentId: number): Observable<Appointment> {
        return this.http.delete(`${this.config.apiUrl}/appointments/${appoinmentId}`,
            this.authenticationService.addJwtOptions())
            .map((response: Response) => response.json());
    }

    public getByTimeSlot(timeSlotId): Observable<Appointment> {
        return this.http.get(`${this.config.apiUrl}/appointments/byTimeSlot/${timeSlotId}`, this.authenticationService.addJwtOptions())
            .flatMap((response: Response) => this.fromJson(response.json()));
    }

    public getDoctorAppointments(doctor: Doctor, startDate: Date, endDate: Date): Observable<Appointment[]> {
        return this.http.get(`${this.config.apiUrl}/appointmentsForDoc/${doctor._id}/${startDate.getTime()}/${endDate.getTime()}`)
            .map((response) => response.json())
            .flatMap((slots: any[]) =>
                Observable.forkJoin(slots.map(s => this.fromJson(s))));
    }

    public getPatientAppointments(patient: Patient, startDate: Date, endDate: Date): Observable<Appointment[]> {
        return this.http.get(`${this.config.apiUrl}/appointmentsForPatient/${patient.id}/${startDate.getTime()}/${endDate.getTime()}`)
            .map((response) => response.json())
            .flatMap((slots: any[]) =>
                Observable.forkJoin(slots.map(s => this.fromJson(s))));
    }

    public getAppointmentById(appointmentId) {
        return this.http.get(`${this.config.apiUrl}/appointments/${appointmentId}`, this.authenticationService.addJwtOptions())
            .map((response: Response) => response.json());
    }

    private fromJson(json: any): Observable<Appointment> {
        console.log(json);
        let a: Appointment = json;
        let self: AppointmentService = this;
        if (a.timeSlot != undefined && a.patient != undefined) { // I have no idea why sometimes it is present and sometimes not
            a.timeSlot.doctorId = +a.timeSlot.doctor._id;
            a.patientId = a.patient.id;
            return Observable.of(a);
        } else {
            return self.timeSlotService.getById(a.timeSlotId).map(slot => {
                a.timeSlot = slot;
                a.timeSlot.doctor._id = json.timeSlot.doctor.id; //TODO: Dlaczego używamy _id tam gdzie jest 'id'?
                return a;
            }).flatMap((app: Appointment) => {
                return self.patientService.getById(app.patientId + '').map((patient: Patient) => {
                    app.patient = patient;
                    return app;
                });
            });
        }
    }
}
