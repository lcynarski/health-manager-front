import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';

import { AppConfig } from '../../app.config';
import { AuthenticationService } from '../index';
import { Modality } from '../../_models/medcom/modality';
import { mockModalities } from '../../_models/_mocks/medcom';


@Injectable()
export class ModalitiesService {

    constructor(private http: Http,
                private config: AppConfig,
                private authService: AuthenticationService) {
    }


    public getMockModalities(): Observable<Modality[]> {
        return Observable.of(mockModalities);
    }

    public findMockModalityById(id: number): Modality {
        return mockModalities
            .find((modality) => modality.id === id);
    }

}
