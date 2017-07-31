import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
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

    public saveAppointment(patientId, appointmentData) {
        this.http.put(`${this.config.apiUrl}/patients/${patientId}/appointments`,
            appointmentData, this.addJwtOptions()).subscribe();
    }

    public getByTimeSlot(timeSlotId): Observable<Appointment> {
        return this.http.get(`${this.config.apiUrl}/appointments/byTimeSlot/${timeSlotId}`, this.addJwtOptions())
            .map((response: Response) => {
                console.log('resonse ' + response.status)
                if (response.status >= 200 && response.status < 300) {
                    return response.json()
                } else {
                    return null //Wykonanie wywala się na 404 i nie dochodzi do tego co jest dziwne bo to poprawne z punktu widzenia HTTP ale nie szkodzi
                }
            });
    }

    private addJwtOptions() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            const headers = new Headers({Authorization: 'Bearer ' + this.authenticationService.token});
            return new RequestOptions({headers});
        }
    }
}
