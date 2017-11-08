import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../navigation/nga.module';

import { routing } from './patientsList.routing';
import { PatientsListComponent } from './patientsList.component';
import { PatientsListItemComponent } from './patients-list-item.component';
import { PatientDetailsComponent } from '../patientDetails/patientDetails.component';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatTableModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgaModule,
        routing,
        TranslateModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule
    ],
    declarations: [
        PatientsListComponent,
        PatientsListItemComponent
        // PatientDetailsComponent
    ]
})
export class PatientsListModule {
}
