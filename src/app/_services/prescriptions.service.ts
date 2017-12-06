import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { AuthenticationService } from '../_services/index';
import { AppConfig } from '../app.config';

@Injectable()
export class PrescriptionsService {

    constructor(private http: Http,
                private authenticationService: AuthenticationService,
                private config: AppConfig) {
    }

    public getPrescriptionById(id) {
        return this.http.get(`${this.config.apiUrl}/prescriptions/${id}`, this.authenticationService.addJwtOptions())
            .map((response: Response) => response.json());
    }

    public getPrescriptionsForPatient(patientId) {
        const headers = new Headers({ Authorization: 'Bearer ' + this.authenticationService.token });
        return this.http.get(`${this.config.apiUrl}/prescriptions`, { params: { patientId }, headers })
            .map((response: Response) => response.json());
    }

    public savePrescription(data) {
        return this.http.post(`${this.config.apiUrl}/prescriptions`, data, this.authenticationService.addJwtOptions())
            .map((response: Response) => response.json());
    }

    public updatePrescription(id, data) {
        return this.http.put(`${this.config.apiUrl}/prescriptions/${id}`, data, this.authenticationService.addJwtOptions())
            .map((response: Response) => response.json());
    }

    public deletePrescription(id) {
        return this.http.delete(`${this.config.apiUrl}/prescriptions/${id}`, this.authenticationService.addJwtOptions())
            .map((response: Response) => response.json());
    }

    public getMinePrescriptions() {
        return this.http.get(`${this.config.apiUrl}/prescriptions`, this.authenticationService.addJwtOptions())
            .map((response: Response) => response.json());
    }
}
