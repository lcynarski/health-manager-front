import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdlModule } from '@angular-mdl/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { routing } from './medcom.routing';
import { DicomDirective } from '../_directives/medcom/dicom.directive';
import { MedcomComponent } from './medcom.component';
import { MedcomPatientRecordComponent } from './dicom-archive/medcom-patient-record/medcom-patient-record.component';
import { MedcomStudyDialogComponent } from './dicom-archive/medcom-study-dialog/medcom-study-dialog.component';
import { DicomArchiveComponent } from './dicom-archive/dicom-archive.component';
import { ModalitiesComponent } from './modalities/modalities.component';
import { ProceduresScheduleComponent } from './procedures-schedule/procedures-schedule.component';
import { ArchiveService, ScheduledProceduresService, ModalitiesService } from '../_services/medcom';


@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        MdlModule,
        routing,
    ],
    declarations: [
        MedcomComponent,
        DicomArchiveComponent,
        MedcomPatientRecordComponent,
        MedcomStudyDialogComponent,
        ModalitiesComponent,
        ProceduresScheduleComponent,
        DicomDirective,
    ],
    entryComponents: [
        MedcomStudyDialogComponent,
    ],
    providers: [
        ArchiveService,
        ScheduledProceduresService,
        ModalitiesService,
    ]
})
export class MedcomModule {
}
