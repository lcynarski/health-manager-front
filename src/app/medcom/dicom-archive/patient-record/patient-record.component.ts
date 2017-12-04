import { Component, Input } from '@angular/core';
import { ArchiveService } from '../../../_services';
import { DicomStudy, MedcomPatient } from '../../../_models';
import { Spinner } from '../../../shared';


@Component({
    selector: 'patient-record',
    templateUrl: 'patient-record.component.html',
    styleUrls: ['patient-record.component.scss'],
})
export class PatientRecordComponent {

    @Input()
    public patient: MedcomPatient;

    studies: DicomStudy[];
    expanded: boolean = false;
    fetchingStudies: boolean = false;
    spinner = Spinner;

    constructor(private archiveService: ArchiveService) {
        this.archiveService.collapseRecordsStream
            .filter((source) => source !== this.patient.id)
            .subscribe(() => this.onCollapse());
    }

    toggleExpanded() {
        if (this.expanded) {
            this.onCollapse();
        } else {
            this.onExpand();
        }
    }

    private onExpand() {
        this.fetchingStudies = true;
        this.studies = null;
        this.archiveService.getStudies(this.patient.id)
            .subscribe(
                (studies: DicomStudy[]) => {
                    this.archiveService.collapseRecords(this.patient.id);
                    this.studies = studies;
                    this.fetchingStudies = false;
                    this.expanded = true;
                },
                (error) => {
                    console.error('could nto fetch studies!', error);
                    this.onCollapse();
                }
            );
    }

    private onCollapse() {
        this.expanded = false;
        this.fetchingStudies = false;
    }

}
