import { Component, Input } from '@angular/core';
import { MdlDialogService } from '@angular-mdl/core';

import { ArchiveService } from '../../../_services';
import { DicomStudy, MedcomPatient } from '../../../_models';
import { MedcomStudyDialogComponent, STUDY_INJECTION_TOKEN, } from '../study-dialog/study-dialog.component';


@Component({
    selector: 'patient-record',
    templateUrl: 'patient-record.component.html',
    styleUrls: ['patient-record.component.scss']
})
export class MedcomPatientRecordComponent {

    @Input()
    public patient: MedcomPatient;
    studies: DicomStudy[];
    expanded: boolean = false;
    fetchingStudies: boolean = false;

    constructor(private dialogService: MdlDialogService,
                private archiveService: ArchiveService) {}

    toggleExpanded() {
        if (this.expanded) {
            this.onCollapse();
        } else {
            this.onExpand();
        }
    }

    showStudy(study: DicomStudy, $event) {
        this.dialogService.showCustomDialog({
            openFrom: $event,
            component: MedcomStudyDialogComponent,
            providers: [
                { provide: STUDY_INJECTION_TOKEN, useValue: study },
            ],
            isModal: true,
            styles: {
                width: '100%',
                height: '100%',
                padding: '0',
                background: '#495057'
            },
            clickOutsideToClose: true,
            enterTransitionDuration: 400,
            leaveTransitionDuration: 400
        });
    }

    private onExpand() {
        this.fetchingStudies = true;
        this.archiveService.getStudies(this.patient.id)
            .subscribe(
                (studies: DicomStudy[]) => {
                    this.studies = studies;
                    this.fetchingStudies = false;
                    this.expanded = true;
                },
                (error) => {
                    this.onCollapse();
                }
            );
    }

    private onCollapse() {
        this.studies = null;
        this.expanded = false;
        this.fetchingStudies = false;
    }

}
