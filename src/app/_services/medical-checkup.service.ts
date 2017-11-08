import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { AuthenticationService } from '../_services/index';
import { AppConfig } from '../app.config';

@Injectable()
export class MedicalCheckupService {

    constructor(private http: Http,
                private authenticationService: AuthenticationService,
                private config: AppConfig) {
    }

    public getAllMedicalCheckups(patientId) {
        return this.http.get(`${this.config.apiUrl}/patients/${patientId}/checkups`, this.authenticationService.addJwtOptions())
            .map((response: Response) => response.json());
    }

    public saveMedicalCheckup(patientId, medicalCheckupData) {
        return this.http.post(`${this.config.apiUrl}/patients/${patientId}/checkups`, medicalCheckupData, this.authenticationService.addJwtOptions())
            .map((response: Response) => response.json());
    }

    public updateMedicalCheckup(patientId, medicalCheckupData) {
        return this.http.put(`${this.config.apiUrl}/patients/${patientId}/checkups`, medicalCheckupData, this.authenticationService.addJwtOptions())
            .map((response: Response) => response.json());
    }

    public deleteMedicalCheckup(patientId) {
        return this.http.delete(`${this.config.apiUrl}/patients/${patientId}/checkups`, this.authenticationService.addJwtOptions())
            .map((response: Response) => response.json());
    }

}
