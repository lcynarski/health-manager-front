import { Component, Input, HostListener, InjectionToken, Inject, ViewEncapsulation } from '@angular/core';
import { MdlDialogReference } from '@angular-mdl/core';
import { DicomStudy } from '../../../_models/medcom/archive';
import { MedcomService } from '../../../_services/medcom.service';

export const STUDY_INJECTION_TOKEN = new InjectionToken<DicomStudy>('studyDetails');

@Component({
    selector: 'study-dialog',
    templateUrl: 'medcom-study-dialog.component.html',
    styleUrls: ['medcom-study-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class MedcomStudyDialogComponent {

    instanceUrl: string;

    constructor(@Inject(STUDY_INJECTION_TOKEN) public study: DicomStudy,
                private dialog: MdlDialogReference,
                private medcomService: MedcomService) {
        if (study.series.length) {
            this.onSeriesChange({index: 0});
        }
    }

    onSeriesChange({ index }) {
        console.log('series changed to ' + index);
        const series = this.study.series[index];
        this.instanceUrl = this.medcomService.getInstanceUrl(this.study, series);
    }

    @HostListener('keydown.esc')
    public onEsc(): void {  // TODO: fixme
        console.log('on esc');
        this.dialog.hide();
    }
}
