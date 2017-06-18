import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import { AuthenticationService } from '../_services/index';
import { AppConfig } from '../app.config';
import { User } from '../_models/index';

@Injectable()
export class UserService {
    constructor(
        private http: Http,
        private authenticationService: AuthenticationService,
        private config: AppConfig) {
    }

    public getAll() {
        return this.http.get(this.config.apiUrl + '/users', this.jwt()).map((response: Response) => response.json());
    }

    public getById(_id: string) {
        return this.http.get(this.config.apiUrl + '/users/' + _id, this.jwt()).map((response: Response) => response.json());
    }

    public create(user: User) {
        return this.http.post(this.config.apiUrl + '/register', user);
    }

    public update(user: User) {
        return this.http.put(this.config.apiUrl + '/users/' + user._id, user, this.jwt());
    }

    public delete(_id: string) {
        return this.http.delete(this.config.apiUrl + '/users/' + _id, this.jwt());
    }

    public changePassword(email: string, currentPassword: string, newPassword: string, newRepeatedPassword: string): Observable<boolean> {
        const data = {email, currentPassword, newPassword, newRepeatedPassword};
        return this.http.post(this.config.apiUrl + '/changePassword', data, this.addOptions())
            .map((response: Response) => {
                return response.json() && response.json().isSuccess;
            });
    }

    public resetPassword(email: string): Observable<boolean> {
        const data = {email};
        return this.http.post(this.config.apiUrl + '/resetPassword', data, this.addOptions())
            .map((response: Response) => {
                return response.json();
            });
    }

    private jwt() {
        // create authorization header with jwt token
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            const headers = new Headers({ Authorization : 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers });
        }
    }

    private getUsers(): Observable<User[]> {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });

        // get users from api
        return this.http.get('/api/users', options)
            .map((response: Response) => response.json());
    }
    private addOptions() {
        const headers = new Headers({ Authorization: 'Bearer ' + this.authenticationService.token });
        return new RequestOptions({ headers });
    }
}
