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
        console.log('szukam');
        console.log(_id);
        return this.http.get(this.config.apiUrl + '/patients/' + _id)
            .map((response: Response) => response.json());
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