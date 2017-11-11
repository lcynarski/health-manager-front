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

    public getAllForms() {
        return this.http.get(`${this.config.apiUrl}/forms`, this.authenticationService.addJwtOptions())
            .map((response: Response) => {
                return response.json();
            });
    }

    public getFormById(id: number) {
        return this.http.get(`${this.config.apiUrl}/forms/${id}`, this.authenticationService.addJwtOptions())
            .map((response: Response) => {
                console.log('GET FORM BY ID: ' + response.json());
                return response.json();
            });
    }

    public getFormsByName(name: string) {
        return this.http.get(`${this.config.apiUrl}/forms/name/${name}`, this.authenticationService.addJwtOptions())
            .map((response: Response) => {
                console.log('GET FORMS BY NAME: ' + response.json());
                return response.json();
            });
    }

    public getFormsByOwnerId(id: number) {
        return this.http.get(`${this.config.apiUrl}/forms/owner/${id}`, this.authenticationService.addJwtOptions())
            .map((response: Response) => {
                console.log('GET FORMS BY OWNER: ' + response.json());
                return response.json();
            });
    }

    public saveForm(form) {
        return this.http.post(`${this.config.apiUrl}/forms`, form, this.authenticationService.addJwtOptions())
            .map((response: Response) => {
                console.log('SAVE FORM: ' + response.json());
            }).subscribe();
    }

    public deleteForm(id: number) {
        return this.http.delete(`${this.config.apiUrl}/forms/${id}`, this.authenticationService.addJwtOptions())
            .map((response: Response) => {
                console.log('DELETE FORM: ' + response.json());
                return response.json();
            });
    }

    public getDefaultValues(formId) {
        return this.http.get(`${this.config.apiUrl}/forms/${formId}/default`, this.authenticationService.addJwtOptions())
            .map((response: Response) => {
                console.log('GET DEFAULT VALUES: ' + response.json());
                return response.json();
            });
    }

    // public saveDefaultValues(formId) {
    //     return this.http.post(`${this.config.apiUrl}/forms/${formId}/default`, this.authenticationService.addJwtOptions())
    //         .map((response: Response) => {
    //             console.log('GET DEFAULT VALUES: ' + response.json());
    //             return response.json();
    //         });
    // }
}
