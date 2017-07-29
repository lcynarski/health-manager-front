import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

import {AuthenticationService} from '../_services/index';
import {AppConfig} from '../app.config';
import {Doctor} from '../_models/doctor';

@Injectable()
export class TimeSlotService {
    constructor(private http: Http,
                private authenticationService: AuthenticationService,
                private config: AppConfig) {
    }

    public getTimeSlots(doctor: Doctor, startDate: Date, endDate: Date) {
        return this.http.get(`${this.config.apiUrl}/timeSlots/${doctor._id}/${startDate.getTime()}/${endDate.getTime()}`)
            .map((response) => response.json());
    }

    private addJwtOptions() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            const headers = new Headers({Authorization: 'Bearer ' + this.authenticationService.token});
            return new RequestOptions({headers});
        }
    }
}
