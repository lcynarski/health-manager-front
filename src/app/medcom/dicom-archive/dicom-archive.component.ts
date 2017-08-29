import { Component, OnInit, OnDestroy } from '@angular/core';

import { MedcomService } from '../../_services/index';
import { DicomArchive } from '../../_models/medcom/archive';
import { Subject } from 'rxjs/Subject';


@Component({
    selector: 'dicom-archive',
    templateUrl: 'dicom-archive.component.html',
    styleUrls: ['dicom-archive.component.scss']
})
export class DicomArchiveComponent implements OnInit, OnDestroy {
    private ngUnsubscribe: Subject<void> = new Subject<void>();
    private fetching: boolean = false;
    private errorMsg: string = null;
    private archive: DicomArchive = null;

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
        this.medcomService.getArchiveTree()
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
