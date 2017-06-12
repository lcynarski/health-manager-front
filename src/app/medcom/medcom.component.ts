import {Component, OnInit} from '@angular/core';

import {MedcomService} from "../_services/index";
import {DicomArchive} from '../_models/medcom/archive';


@Component({
    templateUrl: 'medcom.component.html',
    styleUrls: ['medcom.component.scss']
})

/**
 *  component from MEDCOM project that will be used
 *  to display DICOM study data and images
 *
 */
export class MedcomComponent implements OnInit {
    fetching: boolean = false;
    errorMsg: string = null;
    archive: DicomArchive = null;

    constructor(private medcomService: MedcomService) {
    }

    ngOnInit() {
        this.fetchArchive();
    }

    fetchArchive(): void {
        this.fetching = true;
        this.medcomService.getArchiveTree()
            .subscribe(
                (archive: DicomArchive) => {
                    this.fetching = false;
                    this.errorMsg = null;
                    this.archive = archive;
                    console.log('dicomArchive fetched successfully')
                },
                error => {
                    this.fetching = false;
                    this.errorMsg = `Network error has occurred! status: ${error.status} ${error.statusText}`
                }
            );
    }

}