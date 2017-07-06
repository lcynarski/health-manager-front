import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../navigation/nga.module';
import { CalendarModule } from 'angular-calendar';

import { routing } from './visitsCalendar.routing';
import { VisitsCalendarComponent } from './visitsCalendar.component';

@NgModule({
    imports: [
        CommonModule,
        CalendarModule.forRoot(),
        FormsModule,
        NgaModule,
        routing
    ],
    declarations: [

        VisitsCalendarComponent,

        // visitsCalendarItemComponent
        // PatientDetailsComponent
    ]
})
export class VisitsCalendarModule {
}
