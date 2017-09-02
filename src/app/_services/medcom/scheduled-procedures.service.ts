import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';

import { AppConfig } from '../../app.config';
import { AuthenticationService } from '../index';
import { mockScheduledProcedures } from '../../_models/_mocks/medcom';
import { ScheduledProcedure } from '../../_models/medcom/scheduledProcedure';


@Injectable()
export class ScheduledProceduresService {

    private readonly getScheduledProceduresPath = this.config.medcomApiUrl + '/modalityWorklist/schedule';

    constructor(private http: Http,
                private config: AppConfig,
                private authService: AuthenticationService) {
    }

    public getSchedule(): Observable<ScheduledProcedure[]> {
        const headers: Headers = new Headers();
        this.authService.addAuthHeader(headers);

        return this.http.get(this.getScheduledProceduresPath, { headers })
            .map((resp) => resp.json())
            .catch((err) => {
                console.error(err);
                throw err;
            });
    }

    public getMockSchedule(): Observable<ScheduledProcedure[]> {
        return Observable.of(mockScheduledProcedures);
    }

}
