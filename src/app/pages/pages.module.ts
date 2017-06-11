import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { routing } from './pages.routing';
import { NgaModule } from '../navigation/nga.module';
// import { AppTranslationModule } from '../app.translation.module';

import { Pages } from './pages.component';
import { PatientDetailsComponent } from './patientDetails/patientDetails.component';
import {MedcomComponent} from '../medcom/medcom.component';

@NgModule({
    imports: [CommonModule, NgaModule, FormsModule, routing],
    declarations: [Pages, PatientDetailsComponent, MedcomComponent]
})
export class PagesModule {
}
