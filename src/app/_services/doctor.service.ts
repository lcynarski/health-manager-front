import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { AuthenticationService } from '../_services/index';
import { AppConfig } from '../app.config';
import { Patient } from '../_models/index';
import {Doctor} from "../_models/doctor";
import { Specialization } from "../_models/specialization";

@Injectable()
export class DoctorService {
    constructor(
        private http: Http,
        private authenticationService: AuthenticationService,
        private config: AppConfig) {
    }

    //TODO dodac wywołania endpointów

    public saveDoctor(data) {
        console.log('Saving doctor');
        console.log(data);
        return this.http.post(`${this.config.apiUrl}/doctors`, data, this.addJwtOptions())
            .map((response: Response) => response.json());
    }



    doctorFromJson(obj:any):Doctor{
        return {
            _id:obj.id,
            firstName:obj.account.personalDetails.firstName,
            lastName:obj.account.personalDetails.lastName,
            specialization: obj.specialization
        };
    }

    getAll(): Observable<Doctor[]> {
        return this.http.get(`${this.config.apiUrl}/doctors`)
            .map((response: Response) => response.json().map(this.doctorFromJson));
    }

    getById(_id: string): Observable<Doctor> {
        return this.http.get(`${this.config.apiUrl}/doctors/${_id}`)
            .map((response: Response) => {
            console.log("responsee");
            console.log(response.json());
            return this.doctorFromJson(response.json());
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
