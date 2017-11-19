import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdlModule } from '@angular-mdl/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgSlimScrollModule } from 'ngx-slimscroll';
import { MatTabsModule } from '@angular/material/tabs';

import { routing } from './medcom.routing';
import { DicomDirective } from '../_directives/medcom/dicom.directive';

import { MedcomComponent } from './medcom.component';
import { MedcomPatientRecordComponent } from './dicom-archive/medcom-patient-record/medcom-patient-record.component';
import { MedcomStudyDialogComponent } from './dicom-archive/medcom-study-dialog/medcom-study-dialog.component';
import { AttributesViewerComponent } from './dicom-archive/medcom-study-dialog/attributes-info/attributes-viewer.component';
import { ToolsPaneComponent } from './dicom-archive/medcom-study-dialog/tools-pane/tools-pane.component';
import { DicomArchiveComponent } from './dicom-archive/dicom-archive.component';
import { ModalitiesComponent } from './modalities/modalities.component';
import { ProceduresScheduleComponent } from './procedures-schedule/procedures-schedule.component';

import {
    ArchiveService,
    ScheduledProceduresService,
    ModalitiesService,
    CornerstoneService,
    DicomAttributesService,
} from '../_services/medcom';
import { DefaultPipe } from '../_pipes';


@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        NgSlimScrollModule,
        MdlModule,
        MatTabsModule,
        routing,
    ],
    declarations: [
        MedcomComponent,
        DicomArchiveComponent,
        MedcomPatientRecordComponent,
        MedcomStudyDialogComponent,
        ModalitiesComponent,
        ProceduresScheduleComponent,
        AttributesViewerComponent,
        ToolsPaneComponent,
        DicomDirective,
        DefaultPipe
    ],
    entryComponents: [
        MedcomStudyDialogComponent,
    ],
    providers: [
        ArchiveService,
        ScheduledProceduresService,
        ModalitiesService,
        CornerstoneService,
        DicomAttributesService,
    ]
})
export class MedcomModule {
}
