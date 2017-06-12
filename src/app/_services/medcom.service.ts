import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import {AppConfig} from "../app.config";
import {AuthenticationService} from "./index";
import {DicomArchive} from '../_models/index';


@Injectable()
export class MedcomService {

    readonly medcomPath = this.config.apiUrl + '/medcom';
    readonly archiveTreePath = '/archive/tree';

    constructor(private http: Http,
                private config: AppConfig,
                private authService: AuthenticationService) {
    }

    getArchiveTree(): Observable<DicomArchive> {
        const headers: Headers = new Headers();
        this.authService.addAuthHeader(headers);

        return this.http.get(this.medcomPath + this.archiveTreePath, {headers: headers})
            .map(resp => resp.json())
            .catch(err => {
                console.error(err);
                throw err;
            });
    }

}
