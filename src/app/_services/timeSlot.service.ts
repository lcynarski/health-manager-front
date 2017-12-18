import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../_services/index';
import { DoctorService } from '../_services/doctor.service';
import { AppConfig } from '../app.config';
import { Doctor } from '../_models/doctor';
import { TimeSlot } from '../_models/timeslot';

@Injectable()
export class TimeSlotService {
    constructor(private http: Http,
        private authenticationService: AuthenticationService,
        private doctorService: DoctorService,
        private config: AppConfig) {
    }

    public getTimeSlots(doctor: Doctor, startDate: Date, endDate: Date): Observable<TimeSlot[]> {
        return this.http.get(`${this.config.apiUrl}/timeSlots/${doctor._id}/${startDate.getTime()}/${endDate.getTime()}`)
            .map((response) => response.json())
            .map((slots: TimeSlot[]) => slots.map(slot => {
                slot.doctor = doctor;
                slot.startDateTime = new Date(slot.startDateTime)
                slot.endDateTime = new Date(slot.endDateTime)
                return slot
            }))
    }

    public moveTimeSlot(docId: number, timeSlotId: number, startDate: Date, endDate: Date): Observable<TimeSlot> {
        return this.http.put(`${this.config.apiUrl}/timeSlotMove/${timeSlotId}/${docId}/${startDate.getTime()}/${endDate.getTime()}`, {})
            .map((response) => response.json()).flatMap(t => this.fromJson(t))
    }

    public getById(id: number): Observable<TimeSlot> {
        return this.http.get(`${this.config.apiUrl}/timeSlot/${id}`)
            .map((response) => response.json()).flatMap(t => this.fromJson(t))
    }

    public removeTimeSlot(id: number): Observable<TimeSlot> {
        return this.http.delete(`${this.config.apiUrl}/timeSlot/${id}`)
            .map((response) => response.json()).flatMap(t => this.fromJson(t))
    }

    private fromJson(slot: TimeSlot): Observable<TimeSlot> {
        slot.startDateTime = new Date(slot.startDateTime)
        slot.endDateTime = new Date(slot.endDateTime)
        return this.doctorService.getById(slot.doctorId + "").map(doc => {
            slot.doctor = doc
            return slot;
        })
    }
}
