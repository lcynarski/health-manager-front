import { Component, Input } from '@angular/core';
import { MdlDialogService } from '@angular-mdl/core';
import { DicomStudy } from '../../../../_models';
import { STUDY_INJECTION_TOKEN, StudyDialogComponent } from '../../study-dialog/study-dialog.component';


@Component({
    selector: 'study-list',
    templateUrl: 'study-list.component.html',
    styleUrls: ['study-list.component.scss'],
})
export class StudyListComponent {

    @Input()
    studies: DicomStudy[];

    constructor(private dialogService: MdlDialogService) {
    }

    getStudyDescription(study: DicomStudy): string {
        return (study.attributes['StudyDescription'])
            ? study.attributes['StudyDescription']
            : study.instanceUID;
    }

    showStudy(study: DicomStudy, $event) {
        this.dialogService.showCustomDialog({
            openFrom: $event,
            component: StudyDialogComponent,
            providers: [
                {provide: STUDY_INJECTION_TOKEN, useValue: study},
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
}
