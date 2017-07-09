import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../navigation/nga.module';
import { CalendarModule } from 'angular-calendar';
import { CalendarHeaderComponent } from './calendar-header.component';
import { routing } from './visitsCalendar.routing';
import { VisitsCalendarComponent } from './visitsCalendar.component';
import {ModalModule} from 'ng2-bs4-modal/ng2-bs4-modal';

@NgModule({
    imports: [
        CommonModule,
        CalendarModule.forRoot(),
        FormsModule,
        NgaModule,
        routing,
        ModalModule

    ],
    declarations: [
        CalendarHeaderComponent,
        VisitsCalendarComponent,

        // visitsCalendarItemComponent
        // PatientDetailsComponent
    ]
})
export class VisitsCalendarModule {
}
