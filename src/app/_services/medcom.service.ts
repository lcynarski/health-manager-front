import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { AppConfig } from '../app.config';
import { AuthenticationService } from './index';
import { DicomArchive } from '../_models/index';
import { DicomSeries, DicomStudy } from '../_models/medcom/archive';


@Injectable()
export class MedcomService {

    private readonly medcomPath = this.config.apiUrl + '/medcom';
    private readonly archiveTreePath = '/archive/tree';

    constructor(private http: Http,
                private config: AppConfig,
                private authService: AuthenticationService) {
    }

    public getArchiveTree(): Observable<DicomArchive> {
        const headers: Headers = new Headers();
        this.authService.addAuthHeader(headers);

        return this.http.get(this.medcomPath + this.archiveTreePath, { headers })
            .map((resp) => resp.json())
            .catch((err) => {
                console.error(err);
                throw err;
            });
    }

    public getRefreshingActiveTree(interval = 10000): Observable<DicomArchive> {
        return Observable.timer(0, interval)
            .exhaustMap(() => this.getArchiveTree());
    }

    public getInstanceUrl(study: DicomStudy, series: DicomSeries): string {
        if (!series.dicoms.length) {
            return null;
        }
        return `${this.medcomPath}/patients/${study.patientId}/studies/${study.studyInstanceUid}/series/${series.seriesInstanceUid}/instances/${series.dicoms[0].sopInstanceUid}`;
    }


}
