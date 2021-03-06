import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { AuthenticationService } from '../_services/index';
import { AppConfig } from '../app.config';
import { Form } from '../_models/form';

@Injectable()
export class DrugsService {

    constructor(private http: Http,
                private authenticationService: AuthenticationService,
                private config: AppConfig) {
    }

    public getFormCreationData() {
        return null;
    }

    public getDrugsByName(name: string) {
        const headers = new Headers({ Authorization: 'Bearer ' + this.authenticationService.token });
        return this.http.get(`${this.config.apiUrl}/drugs`, { params: { name }, headers })
            .map((response: Response) => {
                return response.json();
            });
    }

    public getDrugsByNamePageable(name: string, page: number, size: number) {
        const headers = new Headers({ Authorization: 'Bearer ' + this.authenticationService.token });
        return this.http.get(`${this.config.apiUrl}/drugs`, { params: { name, page, size }, headers })
            .map((response: Response) => {
                return response.json();
            });
    }

    public getDrugDetails(drugId) {
        const headers = new Headers({ Authorization: 'Bearer ' + this.authenticationService.token });
        return this.http.get(`${this.config.apiUrl}/drugs/${drugId}`, { headers })
            .map((response: Response) => {
                return response.json();
            });
    }
}
