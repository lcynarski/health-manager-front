import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';

import { AuthenticationService } from '../index';
import { MODALITY } from './medcom-request-mappings';
import { DicomModality } from '../../_models/medcom/dicomModality';
import { mockModalities } from '../../_models/_mocks/medcom';


@Injectable()
export class ModalitiesService {

    constructor(private http: Http,
                private authService: AuthenticationService) {
    }


    public getMockModalities(): Observable<DicomModality[]> {
        return Observable.of(mockModalities);
    }

    public getModalities(): Observable<DicomModality[]> {
        const headers: Headers = new Headers();
        this.authService.addAuthHeader(headers);

        return this.http.get(MODALITY.GET_ALL, { headers })
            .map((resp) => resp.json())
            .catch((err) => {
                console.error(err);
                throw err;
            });
    }

}
