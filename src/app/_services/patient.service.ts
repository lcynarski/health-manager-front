import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { AuthenticationService } from '../_services/index';
import { AppConfig } from '../app.config';
import { Patient } from '../_models/index';

@Injectable()
export class PatientService {
    constructor(private http: Http,
                private authenticationService: AuthenticationService,
                private config: AppConfig) {
    }

    public getAll() {
        console.log('___', this.addJwtOptions().headers);
        return this.http.get(`${this.config.apiUrl}/patients`)
            .map((response: Response) => response.json());
    }

    public getById(_id: string) {
        return this.http.get(`${this.config.apiUrl}/patients/${_id}`)
            .map((res) => res.json());
    }

    public getMedicalInfo(_id: string) {
        return this.http.get(`${this.config.apiUrl}/patients/${_id}`)
            .map((res) => res.json());
    }

    public getPatients(): Observable<Patient[]> {
        return this.http.get(`${this.config.apiUrl}/patients`, this.addJwtOptions())
            .map((response: Response) => response.json());
    }

    public savePatient(data) {
        console.log(data);
        return this.http.post(`${this.config.apiUrl}/patients`, data, this.addJwtOptions())
            .map((response: Response) => response.json());
    }

    public editPatient(data) {
        return this.http.put(`${this.config.apiUrl}/patients`, data, this.addJwtOptions())
            .map((response) => response.json());
    }

    public getPatientByPesel(pesel) {
        return this.http.get(`${this.config.apiUrl}/patients/pesel/${pesel}`, this.addJwtOptions())
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
