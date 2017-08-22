import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { AppConfig } from '../app.config';

@Injectable()
export class AuthenticationService {
    public token: string;

    constructor(private http: Http, private config: AppConfig) {
        // set token if saved in local storage
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    public login(email: string, password: string): Observable<boolean> {
        console.log('DBG: trying to login.' + email + ' ' + password);
        return this.http.post(this.config.apiUrl + '/users/login', { email, password })
            .map((response: Response) => {
                const token = response.json() && response.json().token;
                console.log('DBG: token ' + token);
                if (token) {
                    this.token = token;
                    localStorage.setItem('currentUser', JSON.stringify({ email, token }));
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
}