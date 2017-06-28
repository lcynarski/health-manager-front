import {Component, OnInit, OnDestroy} from '@angular/core';

import {MedcomService} from '../_services/index';
import {DicomArchive} from '../_models/medcom/archive';
import {Subject} from 'rxjs/Subject';


@Component({
    selector: 'medcom',
    templateUrl: 'medcom.component.html',
    styleUrls: ['medcom.component.scss']
})

/**
 *  component from MEDCOM project that will be used
 *  to display DICOM study data and images
 *
 */
export class MedcomComponent implements OnInit, OnDestroy {
    private ngUnsubscribe: Subject<void> = new Subject<void>();
    private fetching: boolean = false;
    private errorMsg: string = null;
    private archive: DicomArchive = null;
    private dicomUrl: string = 'http://localhost:8081/medcom/patients/24759123/studies/study1/series/series1/instances/instance1'; // TODO

    constructor(private medcomService: MedcomService) {
    }

    public ngOnInit() {
        console.log('ngOnInit');
        this.fetchArchive();
    }

    public ngOnDestroy() {
        console.log('ngOnDestroy');
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    private fetchArchive(): void {
        this.fetching = true;
        this.medcomService.getRefreshingActiveTree()
            .takeUntil(this.ngUnsubscribe)
            .subscribe(
                (archive: DicomArchive) => {
                    this.fetching = false;
                    this.errorMsg = null;
                    this.archive = archive;
                    console.log('dicomArchive fetched successfully');
                },
                (error) => {
                    this.fetching = false;
                    this.errorMsg = `Network error has occurred! status: ${error.status} ${error.statusText}`;
                }
            );
    }

}
