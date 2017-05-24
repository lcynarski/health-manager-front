import {Injectable} from '@angular/core';
import {Http, Response, URLSearchParams, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import {Greeting} from "../_models/index";
import {AppConfig} from "../app.config";
import {AuthenticationService} from "./index";


@Injectable()
export class MedcomService {

    readonly greetingPath = '/greeting';

    //TODO move to some generic error handling service/superclass
    private static handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `status ${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    constructor(
        private http: Http,
        private config: AppConfig,
        private authService: AuthenticationService) {
    }

    getGreeting(name: string): Observable<Greeting> {
        const params: URLSearchParams = new URLSearchParams();
        params.set('name', name);

        const headers: Headers = new Headers();
        this.authService.addAuthHeader(headers);

        return this.http.get(this.config.medcomUrl + this.greetingPath, {search: params, headers: headers})
            .map(resp => resp.json())
            .catch(MedcomService.handleError);
    }

}
