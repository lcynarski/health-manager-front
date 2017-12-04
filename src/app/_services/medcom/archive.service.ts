import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';

import { AuthenticationService } from '../index';
import { PATIENT, STUDIES, SERIES, INSTANCES } from './medcom-request-mappings';
import { MedcomPatient, DicomStudy, DicomSeries, DicomInstance } from '../../_models';


@Injectable()
export class ArchiveService { // TODO custom Requester class to lower boilerplate

    public collapseRecordsStream: Observable<number>;

    private collapseRecordsSource: Subject<number> = new Subject();

    constructor(private http: Http,
                private authService: AuthenticationService) {
        this.collapseRecordsStream = this.collapseRecordsSource.asObservable();
    }

    public getMedcomPatients(): Observable<MedcomPatient[]> {
        const headers: Headers = new Headers();
        this.authService.addAuthHeader(headers);

        return this.http.get(PATIENT.GET_ALL, {headers})
            .map((resp) => resp.json())
            .catch((err) => {
                console.error(err);
                throw err;
            });
    }

    public getStudies(patientId: number): Observable<DicomStudy[]> {
        const headers: Headers = new Headers();
        this.authService.addAuthHeader(headers);
        const url = PATIENT.GET_STUDIES_LIST.replace(/{patientId}/, patientId.toString());

        return this.http.get(url, {headers})
            .map((resp) => resp.json())
            .catch((err) => {
                console.error(err);
                throw err;
            });
    }

    public getSeries(studyUID: string): Observable<DicomSeries[]> {
        const headers: Headers = new Headers();
        this.authService.addAuthHeader(headers);
        const url = STUDIES.GET_SERIES_LIST.replace(/{studyId}/, studyUID);

        return this.http.get(url, {headers})
            .map((resp) => resp.json())
            .catch((err) => {
                console.error(err);
                throw err;
            });
    }

    public getInstances(seriesUID: string): Observable<DicomInstance[]> {
        const headers: Headers = new Headers();
        this.authService.addAuthHeader(headers);
        const url = SERIES.GET_INSTANCES_LIST.replace(/{seriesId}/, seriesUID);

        return this.http.get(url, {headers})
            .map((resp) => resp.json())
            .catch((err) => {
                console.error(err);
                throw err;
            });
    }

    public resolveDicomUrl(study: DicomStudy, instance: DicomInstance): string {
        return INSTANCES.GET_DICOM
                .replace(/{patientId}/, study.patientPesel)
                .replace(/{studyId}/, study.instanceUID)
                .replace(/{seriesId}/, instance.seriesInstanceUID)
                .replace(/{instanceId}/, instance.instanceUID)
            + '.dcm';
    }

    public collapseRecords(sourcePatientId: number): void {
        this.collapseRecordsSource.next(sourcePatientId);
    }

}
