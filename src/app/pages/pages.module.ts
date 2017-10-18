import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './pages.routing';
import { NgaModule } from '../navigation/nga.module';
// import { AppTranslationModule } from '../app.translation.module';
import {
    MatStepperModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatButtonToggleModule,
    MatLineModule,
    MatIconModule,
    MatRippleModule,
    MatTabsModule, MatDatepickerModule, MatNativeDateModule
} from '@angular/material';
import { ModalModule } from 'ng2-bs4-modal/ng2-bs4-modal';
import { Pages } from './pages.component';
import { PatientDetailsComponent } from './patientDetails/patientDetails.component';
import { AgmCoreModule } from '@agm/core';
import { Paper } from '../components/paper/paper.component';
import { VisitsCalendarComponent } from './visitsCalendar/visitsCalendar.component';
import { CalendarModule } from 'angular-calendar';
import { CalendarHeaderComponent } from './visitsCalendar/calendar-header.component';
import { CreatePatientComponent } from './createPatient/createPatient.component';
import { TimeTableComponent } from './timeTable/timeTable.component';
import { CreateDoctorComponent } from './createDoctor/createDoctor.component';
import { CreateTimeslotComponent } from './createTimeslot/createTimeslot.component';
import { DynamicFormModule } from '../components/dynamic-form/dynamic-form.module';
import { UsersProfileComponent } from './usersProfile/usersProfile.component';
import { PhotoUploader } from '../components/photoUploader/photoUploader.component';
import { NgUploaderModule } from 'ngx-uploader';
import { MdlModule } from '@angular-mdl/core';
import { PatientSearchComponent } from './patientSearch/patientSearch.component';
import { ProceedAppointmentComponent } from './proceedApoinment/proceed-appointment.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { DashboardWidgetComponent } from './dashboard/dashboard-widget.component';
import { DrugsSearchComponent } from './drugsSearch/drugsSearch.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MedcomModule } from '../medcom/medcom.module';
import { FormCheckboxComponent } from '../components/dynamic-form/components/form-checkbox/form-checkbox.component';
import { FieldsCreatorComponent } from '../forms/fieldCreator/fieldCreator.component';
import { FieldsRemoverComponent } from '../forms/fieldsRemover/fieldsRemover.component';
import { FormSelectComponent } from '../components/dynamic-form/components/form-select/form-select.component';
import { FormCreatorStore } from '../stores/formCreatorStore';
import { FormsCreatorComponent } from '../forms/formsCreator/formsCreator.component';
import { MdlSelectModule } from '@angular2-mdl-ext/select';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        NgaModule,
        ReactiveFormsModule,
        FormsModule,
        ModalModule,
        CalendarModule.forRoot(),
        routing,
        AgmCoreModule,
        DynamicFormModule,
        NgUploaderModule,
        MdlModule,
        InfiniteScrollModule,
        MdlSelectModule,
        MatStepperModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        MatLineModule,
        MatButtonToggleModule,
        MatIconModule,
        MatRippleModule,
        TranslateModule,
        MdlSelectModule,
        MatTabsModule,
        MatDatepickerModule,
        MatNativeDateModule
    ],
    declarations: [
        Pages,
        PatientDetailsComponent,
        Paper,
        VisitsCalendarComponent,
        CalendarHeaderComponent,
        CreatePatientComponent,
        CreateTimeslotComponent,
        CreateDoctorComponent,
        UsersProfileComponent,
        PhotoUploader,
        PatientSearchComponent,
        ProceedAppointmentComponent,
        ChangePasswordComponent,
        TimeTableComponent,
        DrugsSearchComponent,
        FieldsCreatorComponent,
        FieldsRemoverComponent,
        FormsCreatorComponent
    ]
})
export class PagesModule {
}
