import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { AuthenticationService } from '../_services/index';
import { AppConfig } from '../app.config';
import { Form } from '../_models/form';

@Injectable()
export class FormsService {

    constructor(private http: Http,
                private authenticationService: AuthenticationService,
                private config: AppConfig) {
    }

    public getFormCreationData() {
        return null;
    }

    public getFormById(id: number) {
        return this.http.get(`${this.config.apiUrl}/forms/${id}`)
            .map((response: Response) => {
                console.log('GET FORM BY ID: ' + response.json());
                return response.json();
            });
    }

    public getFormsByName(name: string) {
        return this.http.get(`${this.config.apiUrl}/forms/name/${name}`)
            .map((response: Response) => {
                console.log('GET FORMS BY NAME: ' + response.json());
                return response.json();
            });
    }

    public getFormsByOwnerId(id: number) {
        return this.http.get(`${this.config.apiUrl}/forms/owner/${id}`)
            .map((response: Response) => {
                console.log('GET FORMS BY OWNER: ' + response.json());
                return response.json();
            });
    }

    public saveForm(form) {
        return this.http.post(`${this.config.apiUrl}/forms`, form)
            .map((response: Response) => {
                console.log('SAVE FORM: ' + response.json());
            }).subscribe();
    }

    private addJwtOptions() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            const headers = new Headers({ Authorization: 'Bearer ' + this.authenticationService.token });
            return new RequestOptions({ headers });
        }
    }
}
