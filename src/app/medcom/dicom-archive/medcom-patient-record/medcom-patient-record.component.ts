import { Component, Input, ViewChild } from '@angular/core';
import { MdlDialogService, MdlDialogComponent } from '@angular-mdl/core';
import { DicomPatient, DicomStudy } from '../../../_models/medcom/archive';
import {
    MedcomStudyDialogComponent,
    STUDY_INJECTION_TOKEN
} from '../medcom-study-dialog/medcom-study-dialog.component';


@Component({
    selector: 'patient-record',
    templateUrl: 'medcom-patient-record.component.html',
    styleUrls: ['medcom-patient-record.component.scss']
})
export class MedcomPatientRecordComponent {

    @Input()
    public patient: DicomPatient;

    expanded: boolean = false;

    constructor(private dialogService: MdlDialogService) {}

    toggleExpanded() {
        this.expanded = !this.expanded;
    }

    showStudy(study: DicomStudy, $event) {
        study.patientId = this.patient.patientId;
        this.dialogService.showCustomDialog({
            openFrom: $event,
            component: MedcomStudyDialogComponent,
            providers: [{ provide: STUDY_INJECTION_TOKEN, useValue: study }],
            isModal: true,
            styles: {
                width: '90%',
                height: '90%',
                padding: '0',
                background: '#495057'
            },
            clickOutsideToClose: true,
            enterTransitionDuration: 400,
            leaveTransitionDuration: 400
        });
    }

}
