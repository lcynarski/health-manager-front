import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { AuthenticationService } from '../_services/index';
import { AppConfig } from '../app.config';
import { Patient } from '../_models/index';

@Injectable()
export class PatientService {
    constructor(
        private http: Http,
        private config: AppConfig) {
    }

    getAll() {
        return this.http.get(this.config.apiUrl + '/patients').map((response: Response) => response.json());
    }

    getById(_id: string) {
        return this.http.get(this.config.apiUrl + '/patients/' + _id)
            .map( (res) => res.json())
        //
        // let patient = this.http.get(this.config.apiUrl + '/patients/' + _id)
        //     .map( (res) => res.json())
        // let medicalInformation = this.http.get(this.config.apiUrl + '/patients/' + _id + '/medicalInformation')
        //     .map( (res) => res.json())
        //
        // Observable.forkJoin([patient, medicalInformation]).subscribe(results => {
        //     results[0].medicalInformation = results[1];
        //     return results[0];
        // });
    }

    getMedicalInfo(_id: string) {
        return this.http.get(this.config.apiUrl + '/patients/' + _id + '/medicalInformation')
            .map( (res) => res.json());
    }

    getPatients(): Observable<Patient[]> {
        // add authorization header with jwt token
        // let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        // let options = new RequestOptions({ headers: headers });
        // get users from api
        return this.http.get(this.config.apiUrl + '/patients')
            .map((response: Response) => response.json());
    }
}