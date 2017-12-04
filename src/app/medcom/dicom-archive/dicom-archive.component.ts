import { Component, OnInit } from '@angular/core';
import { ArchiveService, SpinnerService } from '../../_services';
import { MedcomPatient } from '../../_models';
import { Spinner } from '../../shared';


@Component({
    selector: 'dicom-archive',
    templateUrl: 'dicom-archive.component.html',
    styleUrls: ['dicom-archive.component.scss']
})
export class DicomArchiveComponent implements OnInit {

    patients: MedcomPatient[] = null;

    constructor(private archiveService: ArchiveService,
                private spinnerService: SpinnerService) {
    }

    public ngOnInit() {
        this.fetchMedcomPatients();
    }

    private fetchMedcomPatients(): void {
        this.spinnerService.show(Spinner.PAGE);
        this.archiveService.getMedcomPatients()
            .subscribe(
                (patients: MedcomPatient[]) => {
                    this.spinnerService.hide(Spinner.PAGE);
                    this.patients = patients;
                    console.log('dicomArchive fetched successfully');
                },
                (error) => {
                    console.error('could not fetch medcom patients!', error);
                    this.spinnerService.hide(Spinner.PAGE);
                }
            );
    }

}
