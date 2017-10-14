import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../navigation/nga.module';
import { CalendarModule } from 'angular-calendar';
import { routing } from './timeTable.routing';

import {TimeTableComponent} from "./timeTable.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgaModule,
        routing
    ],
    declarations: [
        TimeTableComponent
    ]
})
export class TimeTableModule {
}
