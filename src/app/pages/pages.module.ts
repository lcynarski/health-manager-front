import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { routing } from './pages.routing';
import { NgaModule } from '../navigation/nga.module';
// import { AppTranslationModule } from '../app.translation.module';

import { Pages } from './pages.component';
import { PatientDetailsComponent } from './patientDetails/patientDetails.component';
import {MedcomComponent} from '../medcom/medcom.component';
import { AgmCoreModule } from '@agm/core';
import {Paper} from '../components/paper/paper.component';
import {CreatePatientComponent} from './createPatient/createPatient.component';
import {DynamicFormModule} from "../components/dynamic-form/dynamic-form.module";

@NgModule({
    imports: [
        CommonModule,
        NgaModule,
        FormsModule,
        routing,
        AgmCoreModule,
        DynamicFormModule
    ],
    declarations: [Pages, PatientDetailsComponent, MedcomComponent, Paper, CreatePatientComponent]
})
export class PagesModule {
}
