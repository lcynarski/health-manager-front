import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
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
        console.log('___', this.authenticationService.addJwtOptions().headers);
        return this.http.get(`${this.config.apiUrl}/patients`)
            .map((response: Response) => response.json());
    }

    public getById(_id) {
        return this.http.get(`${this.config.apiUrl}/patients/${_id}`, this.authenticationService.addJwtOptions())
            .map((res) => res.json());
    }

    public getMedicalInfo(_id) {
        return this.http.get(`${this.config.apiUrl}/patients/${_id}/medicalInformation`, this.authenticationService.addJwtOptions())
            .map((res) => res.json());
    }

    public saveMedicalInfo(_id, data) {
        return this.http.post(`${this.config.apiUrl}/patients/${_id}/medicalInformation`, {id: _id, ...data}, this.authenticationService.addJwtOptions());
    }

    public updateMedicalInfo(_id, data) {
        return this.http.put(`${this.config.apiUrl}/patients/${_id}/medicalInformation`, {id: _id, ...data}, this.authenticationService.addJwtOptions());
    }

    public getMedicalHistory(patientId, dateStart, dateEnd) {
        const headers = new Headers({ Authorization: 'Bearer ' + this.authenticationService.token });
        return this.http.get(`${this.config.apiUrl}/patients/${patientId}/history`, {
            params: { dateStart, dateEnd },
            headers
        })
            .map((response: Response) => {
                return response.json();
            });
    }

    public addToMedicalHistory(patientId, data) {
        return this.http.post(`${this.config.apiUrl}/patients/${patientId}/history`,
            {patientId, ...data},
            this.authenticationService.addJwtOptions()
        );
    }

    public getEmergencyContact(patientId) {
        return this.http.get(`${this.config.apiUrl}/patients/${patientId}/emergency`, this.authenticationService.addJwtOptions())
            .map((response: Response) => response.json());
    }

    public addEmergencyContact(patientId, data) {
        return this.http.post(`${this.config.apiUrl}/patients/${patientId}/emergency`, data, this.authenticationService.addJwtOptions())
            .map((response: Response) => response.json());
    }

    public editEmergencyContact(patientId, data) {
        return this.http.put(`${this.config.apiUrl}/patients/${patientId}/emergency`, data, this.authenticationService.addJwtOptions())
            .map((response: Response) => response.json());
    }

    public getPatients(): Observable<Patient[]> {
        return this.http.get(`${this.config.apiUrl}/patients`, this.authenticationService.addJwtOptions())
            .map((response: Response) => response.json());
    }

    public savePatient(data) {
        console.log(data);
        return this.http.post(`${this.config.apiUrl}/users/registerOnBehalf`, data, this.authenticationService.addJwtOptions())
            .map((response: Response) => response);
    }

    public editPatient(data) {
        console.log('editPatient', data);
        return this.http.put(`${this.config.apiUrl}/patients/${data.id}/personalDetails`, data, this.authenticationService.addJwtOptions())
            .map((response) => response.json());
    }

    public getPatientByPesel(pesel) {
        return this.http.get(`${this.config.apiUrl}/patients?pesel=${pesel}`, this.authenticationService.addJwtOptions())
            .map((response) => response.json());
    }

    public getPatientByEmail(email: string) {
        return this.http.get(`${this.config.apiUrl}/patientByMail/${email}/`, this.authenticationService.addJwtOptions())
            .map((res) => res.json());
    }
}
