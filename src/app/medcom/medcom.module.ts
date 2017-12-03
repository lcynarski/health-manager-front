import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdlModule } from '@angular-mdl/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgSlimScrollModule } from 'ngx-slimscroll';
import { MatTabsModule } from '@angular/material/tabs';

import { routing } from './medcom.routing';
import { DicomDirective } from '../_directives/medcom/dicom.directive';

import { MedcomComponent } from './medcom.component';
import { PatientRecordComponent } from './dicom-archive/patient-record/patient-record.component';
import { StudyDialogComponent } from './dicom-archive/study-dialog/study-dialog.component';
import { AttributesViewerComponent } from './dicom-archive/study-dialog/attributes-viewer/attributes-viewer.component';
import { ToolsPaneComponent } from './dicom-archive/study-dialog/tools-pane/tools-pane.component';
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
import { ImageInfoComponent } from './dicom-archive/study-dialog/image-info/image-info.component';
import { StudyListComponent } from './dicom-archive/patient-record/study-list/study-list.component';


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
        PatientRecordComponent,
        StudyListComponent,
        StudyDialogComponent,
        ModalitiesComponent,
        ProceduresScheduleComponent,
        AttributesViewerComponent,
        ImageInfoComponent,
        ToolsPaneComponent,
        DicomDirective,
        DefaultPipe
    ],
    entryComponents: [
        StudyDialogComponent,
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
