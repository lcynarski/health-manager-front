import { Component, Input, HostListener, InjectionToken, Inject, ViewEncapsulation } from '@angular/core';
import { MdlDialogReference } from '@angular-mdl/core';
import { DicomStudy } from '../../../_models/medcom/archive';
import { ArchiveService } from '../../../_services/medcom/archive.service';

export const STUDY_INJECTION_TOKEN = new InjectionToken<DicomStudy>('studyDetails');

@Component({
    selector: 'study-dialog',
    templateUrl: 'medcom-study-dialog.component.html',
    styleUrls: ['medcom-study-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class MedcomStudyDialogComponent {

    images: string[];

    constructor(@Inject(STUDY_INJECTION_TOKEN) public study: DicomStudy,
                private dialog: MdlDialogReference,
                private medcomService: ArchiveService) {
        if (study.series.length) {
            this.onSeriesChange({ index: 0 });
        }
    }

    onSeriesChange({ index }) {
        console.log('series changed to ' + index);
        const series = this.study.series[index];
        this.images = this.medcomService.getSeriesDicoms(this.study, series);
    }

    @HostListener('document:keydown.esc')
    public onEsc(): void {
        this.dialog.hide();
    }
}
