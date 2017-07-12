import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { AuthenticationService } from '../_services/index';
import { AppConfig } from '../app.config';
import { Patient } from '../_models/index';
import {Doctor} from "../_models/doctor";

@Injectable()
export class DoctorService {
    constructor(
        private http: Http,
        private config: AppConfig) {
    }

    //TODO dodac wywołania endpointów

    allDoctors:Doctor[] = [{
        _id: "1",
        firstName:"Marcin",
        lastName: "Matys",
        specialization:"Ortopeda"
    },{
        _id: "5",
        firstName:"Aleksander",
        lastName: "Lejkowski",
        specialization:"Pediatra"
    }];

    doctorFromJson(obj:any):Doctor{
        return {
            _id:obj.id,
            firstName:obj.account.personalDetails.firstName,
            lastName:obj.account.personalDetails.lastName,
            specialization:"Pediatra"
        }
    }

    getAll(): Observable<Doctor[]> {
        return this.http.get(`${this.config.apiUrl}/doctors`)
            .map((response: Response) => response.json().map(this.doctorFromJson));
    }

    getById(_id: string): Observable<Doctor> {
        return this.http.get(`${this.config.apiUrl}/doctors/${_id}`)
            .map((response: Response) => this.doctorFromJson(response.json()));
    }


}