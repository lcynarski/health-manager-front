import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { AuthenticationService } from '../_services/index';
import { AppConfig } from '../app.config';
import { User, ChangePassword } from '../_models/index';
import { PersonalDetails } from '../_models/personalDetails';

@Injectable()
export class UserService {
    constructor(private http: Http,
                private authenticationService: AuthenticationService,
                private config: AppConfig) {
    }

    public getAll() {
        return this.http.get(`${this.config.apiUrl}/users`, this.authenticationService.addJwtOptions())
            .map((response: Response) => response.json());
    }

    public getById(_id: string) {
        return this.http.get(`${this.config.apiUrl}/users/${_id}`, this.authenticationService.addJwtOptions())
            .map((response: Response) => response.json());
    }

    public create(user: any) {
        return this.http.post(`${this.config.apiUrl}/users/register`, user);
    }

    public update(user: User) {
        return this.http.put(`${this.config.apiUrl}/users/${user._id}`, user, this.authenticationService.addJwtOptions());
    }

    public delete(_id: string) {
        return this.http.delete(`${this.config.apiUrl}/users/${_id}`, this.authenticationService.addJwtOptions());
    }

    public changePassword(newPassword: string, params) {
        const headers = new Headers({ Authorization: 'Bearer ' + this.authenticationService.token });
        return this.http.post(`${this.config.apiUrl}/users/password_token`, newPassword, {
            params: { ...params },
            headers
        })
            .map((response: Response) => {
                return response;
            });
    }

    public resetPassword(email: string): Observable<boolean> {
        return this.http.post(`${this.config.apiUrl}/users/password/reset`, email)
            .map((response: Response) => {
                return response.json();
            });
    }

    public updatePersonalDetails(data: PersonalDetails) {
        return this.http.post(`${this.config.apiUrl}/users/updatePersonalDetails/`, data, this.authenticationService.addJwtOptions());
    }

    public getPersonalDetails(): Observable<PersonalDetails> {
        return this.http.get(`${this.config.apiUrl}/accounts/personaldetails`, this.authenticationService.addJwtOptions()).map((response: Response) => response.json());
    }

    public saveProfilePicture(_id: string, photo: any): Observable<string> {
        return this.http.post(`${this.config.apiUrl}/accounts/14/picture`, photo, this.authenticationService.addJwtOptions())
            .map((response: Response) => response.json());
    }

    public getAccount(): Observable<string> {
        return this.http.get(`${this.config.apiUrl}/accounts`, this.authenticationService.addJwtOptions())
            .map((response: Response) => response.json());
    }

    public getMedicalInfo() {
        return this.http.get(`${this.config.apiUrl}/accounts/medical`, this.authenticationService.addJwtOptions())
            .map((response) => response.json());
    }

    public saveMedicalInfo(data) {
        return this.http.post(`${this.config.apiUrl}/accounts/medical`, data, this.authenticationService.addJwtOptions())
            .map((response) => response.json());
    }

    public editMedicalInfo(data) {
        return this.http.put(`${this.config.apiUrl}/accounts/medical`, data, this.authenticationService.addJwtOptions())
            .map((response) => response.json());
    }

    public getEmergencyContact() {
        return this.http.get(`${this.config.apiUrl}/accounts/emergency`, this.authenticationService.addJwtOptions())
            .map((response) => response.json());
    }

    public saveEmergencyContact(data) {
        return this.http.post(`${this.config.apiUrl}/accounts/emergency`, data, this.authenticationService.addJwtOptions())
            .map((response) => response.json());
    }

    public editEmergencyContact(data) {
        return this.http.put(`${this.config.apiUrl}/accounts/emergency`, data, this.authenticationService.addJwtOptions())
            .map((response) => response.json());
    }

    public getMedicalHistory(dateStart, dateEnd) {
        const headers = new Headers({ Authorization: 'Bearer ' + this.authenticationService.token });
        return this.http.get(`${this.config.apiUrl}/patients/history`, {
            params: { dateStart, dateEnd },
            headers
        })
            .map((response: Response) => {
                return response.json();
            });
    }
}
