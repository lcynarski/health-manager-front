import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import { AuthenticationService } from '../_services/index';
import { AppConfig } from '../app.config';
import { User, ChangePassword } from '../_models/index';

@Injectable()
export class UserService {
    constructor(
        private http: Http,
        private authenticationService: AuthenticationService,
        private config: AppConfig) {
    }

    public getAll() {
        return this.http.get(this.config.apiUrl + '/users', this.addJwtOptions()).map((response: Response) => response.json());
    }

    public getById(_id: string) {
        return this.http.get(this.config.apiUrl + '/users/' + _id, this.addJwtOptions()).map((response: Response) => response.json());
    }

    public create(user: User) {
        console.log(user);
        return this.http.post(this.config.apiUrl + '/register', user);
    }
    public update(user: User) {
        return this.http.put(this.config.apiUrl + '/users/' + user._id, user, this.addJwtOptions());
    }

    public delete(_id: string) {
        return this.http.delete(this.config.apiUrl + '/users/' + _id, this.addJwtOptions());
    }

    public changePassword(data: ChangePassword): Observable<boolean> {
        return this.http.post(this.config.apiUrl + '/users/updatePassword', data, this.addJwtOptions())
            .map((response: Response) => {
                return response.json() && response.json().isSuccess;
            });
    }

    public resetPassword(email: string): Observable<boolean> {
        const data = { email };
        console.log(email);
        return this.http.post(this.config.apiUrl + '/users/resetPassword', email)
            .map((response: Response) => {
                return response.json();
            });
    }

    public testMethod(cos: string) {
        console.log(cos);
    }

    private getUsers(): Observable<User[]> {
        // get users from api
        return this.http.get('/api/users', this.addJwtOptions())
            .map((response: Response) => response.json());
    }

    private addJwtOptions() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            const headers = new Headers({Authorization: 'Bearer ' + this.authenticationService.token});
            return new RequestOptions({headers});
        }
    }
}
