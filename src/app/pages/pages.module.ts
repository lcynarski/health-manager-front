import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { routing } from './pages.routing';
import { NgaModule } from '../navigation/nga.module';
// import { AppTranslationModule } from '../app.translation.module';
import {ModalModule} from 'ng2-bs4-modal/ng2-bs4-modal';
import { Pages } from './pages.component';
import { PatientDetailsComponent } from './patientDetails/patientDetails.component';
import {MedcomComponent} from '../medcom/medcom.component';
import {VisitsCalendarComponent} from "./visitsCalendar/visitsCalendar.component";
import {CalendarModule} from "angular-calendar";
import {CalendarHeaderComponent} from "./visitsCalendar/calendar-header.component";

@NgModule({
    imports: [CommonModule, NgaModule, FormsModule,  ModalModule,
        CalendarModule.forRoot(), routing],
    declarations: [Pages, PatientDetailsComponent,
        VisitsCalendarComponent,  CalendarHeaderComponent,
        MedcomComponent]
})
export class PagesModule {
}
