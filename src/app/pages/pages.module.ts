import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './pages.routing';
import { NgaModule } from '../navigation/nga.module';
// import { AppTranslationModule } from '../app.translation.module';

import { Pages } from './pages.component';
import { PatientDetailsComponent } from './patientDetails/patientDetails.component';
import {MedcomComponent} from '../medcom/medcom.component';
import { AgmCoreModule } from '@agm/core';
import {Paper} from '../components/paper/paper.component';
import {CreatePatientComponent} from './createPatient/createPatient.component';
import {DynamicFormModule} from '../components/dynamic-form/dynamic-form.module';
import {UsersProfileComponent} from './usersProfile/usersProfile.component';
import {PhotoUploader} from "../components/photoUploader/photoUploader.component";
import {NgUploaderModule} from "ngx-uploader";
import {MdlModule} from "@angular-mdl/core";
import {PatientSearchComponent} from "./patientSearch/patientSearch.component";


@NgModule({
    imports: [
        CommonModule,
        NgaModule,
        ReactiveFormsModule,
        FormsModule,
        routing,
        AgmCoreModule,
        DynamicFormModule,
        NgUploaderModule,
        MdlModule,

    ],
    declarations: [Pages, PatientDetailsComponent, MedcomComponent, Paper, CreatePatientComponent,
    UsersProfileComponent, PhotoUploader, PatientSearchComponent]
})
export class PagesModule {
}
