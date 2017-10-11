import { Component, OnInit } from '@angular/core';

import { ArchiveService } from '../../_services';
import { MedcomPatient } from '../../_models';


@Component({
    selector: 'dicom-archive',
    templateUrl: 'dicom-archive.component.html',
    styleUrls: ['dicom-archive.component.scss']
})
export class DicomArchiveComponent implements OnInit {

    fetching: boolean = false;
    errorMsg: string = null;
    patients: MedcomPatient[] = null;

    constructor(private archiveService: ArchiveService) {
    }

    public ngOnInit() {
        console.log('ngOnInit');
        this.fetchArchive();
    }

    private fetchArchive(): void {
        this.fetching = true;
        this.archiveService.getMedcomPatients()
            .subscribe(
                (patients: MedcomPatient[]) => {
                    this.fetching = false;
                    this.errorMsg = null;
                    this.patients = patients;
                    console.log('dicomArchive fetched successfully');
                },
                (error) => {
                    this.fetching = false;
                    this.errorMsg = `Network error has occurred! status: ${error.status} ${error.statusText}`;
                }
            );
    }

}
