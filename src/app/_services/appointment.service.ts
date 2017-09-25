import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';

import {AuthenticationService} from '../_services/index';
import {AppConfig} from '../app.config';
import {Appointment} from "../_models/appointment";

@Injectable()
export class AppointmentService {
    constructor(private http: Http,
                private authenticationService: AuthenticationService,
                private config: AppConfig) {
    }

    public saveAppointment(patientId, appointmentData): Observable<any> {
       return this.http.put(`${this.config.apiUrl}/patients/${patientId}/appointments`,
            appointmentData, this.authenticationService.addJwtOptions());
    }

    public removeAppointment(appoinmentId: number): Observable<any> {
        return this.http.delete(`${this.config.apiUrl}/appointments/${appoinmentId}`,
            this.authenticationService.addJwtOptions());
    }

    public getByTimeSlot(timeSlotId): Observable<Appointment> {
        return this.http.get(`${this.config.apiUrl}/appointments/byTimeSlot/${timeSlotId}`, this.authenticationService.addJwtOptions())
            .map((response: Response) => response.json());
    }


}
