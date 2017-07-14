import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdlModule } from '@angular-mdl/core';

import { DicomDirective } from '../_directives/medcom/dicom.directive';
import { MedcomComponent } from './medcom.component';
import { ArchiveTreeComponent } from './archive-tree/archive-tree.component';
import { MedcomPatientRecordComponent } from './medcom-patient-record/medcom-patient-record.component';
import { MedcomStudyDialogComponent } from './medcom-study-dialog/medcom-study-dialog.component';


@NgModule({
    imports: [
        CommonModule,
        MdlModule,
    ],
    declarations: [
        MedcomComponent,
        ArchiveTreeComponent,
        MedcomPatientRecordComponent,
        MedcomStudyDialogComponent,
        DicomDirective,
    ],
    entryComponents: [
        MedcomStudyDialogComponent,
    ],
})
export class MedcomModule {
}
