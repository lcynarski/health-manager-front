import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';

import { AppConfig } from '../../app.config';
import { AuthenticationService } from '../index';
import { DicomArchive } from '../../_models/index';
import { DicomSeries, DicomStudy } from '../../_models/medcom/archive';
import { mockArchive } from '../../_models/_mocks/medcom';


@Injectable()
export class ArchiveService {

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

    public getMockArchiveTree(): Observable<DicomArchive> {
        return Observable.of(mockArchive);
    }

    public getSeriesDicoms(study: DicomStudy, series: DicomSeries): string[] {
        const prefix = `${this.medcomPath}/patients/${study.patientId}/studies/${study.studyInstanceUid}/series/${series.seriesInstanceUid}/instances/`;

        return series.dicoms
            .map((dicom) => prefix + dicom.sopInstanceUid);
    }

}
