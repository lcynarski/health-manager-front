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

    public saveMedicalCheckup(medicalCheckupData) {
        return this.http.post(`${this.config.apiUrl}/checkups`, medicalCheckupData, this.authenticationService.addJwtOptions())
            .map((response: Response) => response.json());
    }

    public updateMedicalCheckup(medicalCheckupData) {
        return this.http.put(`${this.config.apiUrl}/checkups/${medicalCheckupData.id}`, medicalCheckupData, this.authenticationService.addJwtOptions())
            .map((response: Response) => response.json());
    }

    public deleteMedicalCheckup(medicalCheckupId) {
        return this.http.delete(`${this.config.apiUrl}/checkups/${medicalCheckupId}`, this.authenticationService.addJwtOptions())
            .map((response: Response) => response.json());
    }

}
