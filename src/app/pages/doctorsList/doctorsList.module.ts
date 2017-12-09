import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../navigation/nga.module';
import { CalendarModule } from 'angular-calendar';
import { routing } from './doctorsList.routing';

import {DoctorsListComponent} from "./doctorsList.component";
import {MatTableModule} from "@angular/material";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        MatTableModule,
        TranslateModule,
        FormsModule,
        NgaModule,
        routing


    ],
    declarations: [
        DoctorsListComponent
        // visitsCalendarItemComponent
        // PatientDetailsComponent
    ]
})
export class DoctorsListModule {
}
