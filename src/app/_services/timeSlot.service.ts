import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../_services/index';
import { AppConfig } from '../app.config';
import { Doctor } from '../_models/doctor';
import { TimeSlot } from '../_models/timeslot';

@Injectable()
export class TimeSlotService {
    constructor(private http: Http,
        private authenticationService: AuthenticationService,
        private config: AppConfig) {
    }

    public getTimeSlots(doctor: Doctor, startDate: Date, endDate: Date): Observable<TimeSlot[]> {
        return this.http.get(`${this.config.apiUrl}/timeSlots/${doctor._id}/${startDate.getTime()}/${endDate.getTime()}`)
            .map((response) => response.json())
            .map((slots: TimeSlot[]) =>
                slots.map(slot => { //some werid bugs happen if it's not done
                    slot.startDateTime = new Date(slot.startDateTime)
                    slot.endDateTime = new Date(slot.endDateTime)
                    return slot;
                }))
    }
}
