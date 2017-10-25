import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { AuthenticationService } from '../_services/index';
import { AppConfig } from '../app.config';
import { Appointment } from '../_models/appointment';

@Injectable()
export class AppointmentService {
    constructor(private http: Http,
        private authenticationService: AuthenticationService,
        private config: AppConfig) {
    }

    /** returns saved Appointment */
    public saveAppointment(patientId, appointmentData): Observable<Appointment> {
        return this.http.put(`${this.config.apiUrl}/patients/${patientId}/appointments`,
            appointmentData, this.authenticationService.addJwtOptions())
            .map((response: Response) => response.json());
    }

    /** returns removed appointment*/
    public removeAppointment(appoinmentId: number): Observable<Appointment> {
        return this.http.delete(`${this.config.apiUrl}/appointments/${appoinmentId}`,
            this.authenticationService.addJwtOptions())
            .map((response: Response) => response.json());
    }

    public getByTimeSlot(timeSlotId): Observable<Appointment> {
        return this.http.get(`${this.config.apiUrl}/appointments/byTimeSlot/${timeSlotId}`, this.authenticationService.addJwtOptions())
            .map((response: Response) => { //TODO: Dlaczego używamy _id tam gdzie jest 'id'?
                let a: Appointment = response.json();
                a.timeSlot.startDateTime = new Date(a.timeSlot.startDateTime)
                a.timeSlot.endDateTime = new Date(a.timeSlot.endDateTime)
                a.timeSlot.doctor._id = response.json().timeSlot.doctor.id
                return a;
            });
    }


}
