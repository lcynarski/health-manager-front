import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { routing } from './pages.routing';
import { NgaModule } from '../navigation/nga.module';
// import { AppTranslationModule } from '../app.translation.module';

import { Pages } from './pages.component';
import { PatientDetailsComponent } from './patientDetails/patientDetails.component';

// TODO create MedcomModule
import { MedcomComponent, ArchiveTreeComponent } from '../medcom/index';
import { DicomDirective } from '../_directives/medcom/dicom.directive';


@NgModule({
    imports: [CommonModule, NgaModule, FormsModule, routing],
    declarations: [Pages, PatientDetailsComponent, MedcomComponent, ArchiveTreeComponent, DicomDirective],
})
export class PagesModule {
}
