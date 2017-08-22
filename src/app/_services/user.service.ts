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
    constructor(
        private http: Http,
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

    public create(user: User) {
        return this.http.post(`${this.config.apiUrl}/users/register`, user);
    }
    public update(user: User) {
        return this.http.put(`${this.config.apiUrl}/users/${user._id}`, user, this.authenticationService.addJwtOptions());
    }

    public delete(_id: string) {
        return this.http.delete(`${this.config.apiUrl}/users/${_id}`, this.authenticationService.addJwtOptions());
    }

    public changePassword(data: ChangePassword): Observable<boolean> {
        return this.http.post(`${this.config.apiUrl}/users/updatePassword`, data, this.authenticationService.addJwtOptions())
            .map((response: Response) => {
                return response.json() && response.json().isSuccess;
            });
    }

    public resetPassword(email: string): Observable<boolean> {
        return this.http.post(`${this.config.apiUrl}/users/resetPassword`, email)
            .map((response: Response) => {
                return response.json();
            });
    }

    public updatePersonalDetails(data: PersonalDetails) {
        return this.http.post(`${this.config.apiUrl}/users/updatePersonalDetails/`, data, this.authenticationService.addJwtOptions());
    }

    public getPersonalDetails(): Observable<PersonalDetails> {
        return this.http.get(`${this.config.apiUrl}/accounts/personaldetails`, this.authenticationService.addJwtOptions()).
            map((response: Response) => response.json());
    }
}
