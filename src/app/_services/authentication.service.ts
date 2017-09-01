import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import {AppConfig} from '../app.config';
import {JwtHelper} from "angular2-jwt";

@Injectable()
export class AuthenticationService {
    public token: string;
    public role: string;
    public jwtHelper;

    constructor(private http: Http, private config: AppConfig) {
        // set token if saved in local storage
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
        let jwtHelper: JwtHelper = new JwtHelper();
        this.role = this.token && jwtHelper.decodeToken(this.token).scopes;

    }

    public login(email: string, password: string): Observable<boolean> {
        console.log('DBG: trying to login.' + email + ' ' + password);
        return this.http.post(this.config.apiUrl + '/users/login', {email, password})
            .map((response: Response) => {
                const token = response.json() && response.json().token;
                const role = response.json() && response.json().role;
                console.log('DBG: token ' + token);
                if (token) {
                    this.token = token;
                    localStorage.setItem('currentUser', JSON.stringify({email, token}));
                    let jwtHelper: JwtHelper = new JwtHelper();
                    console.log(this.role = jwtHelper.decodeToken(token))
                    this.role = jwtHelper.decodeToken(token).scopes;
                    return true;
                }
                return false;
            });
    }

    public logout(): void {
        this.token = null;
        localStorage.removeItem('currentUser');
    }

    // TODO implement some kind of interceptor adding the auth header
    public addAuthHeader(headers: Headers): boolean {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if (currentUser && currentUser.token) {
            headers.append('Authorization', currentUser.token);
            return true;
        }
        return false;
    }

    public addJwtOptions(): RequestOptions {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            const headers = new Headers({ Authorization: 'Bearer ' + this.token });
            return new RequestOptions({ headers });
        }
    }

    public getRole() {
        return this.role;
    }
}
