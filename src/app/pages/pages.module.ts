import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './pages.routing';
import { NgaModule } from '../navigation/nga.module';
import { ModalModule } from 'ng2-bs4-modal/ng2-bs4-modal';
import { Pages } from './pages.component';
import { PatientDetailsComponent } from './patientDetails/patientDetails.component';
import { AgmCoreModule } from '@agm/core';
import { Paper } from '../components/paper/paper.component';
import { VisitsCalendarComponent } from './visitsCalendar/visitsCalendar.component';
import { CalendarModule } from 'angular-calendar';
import { CalendarHeaderComponent } from './visitsCalendar/calendar-header.component';
import { CreatePatientComponent } from './createPatient/createPatient.component';
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
import { DrugsSearchComponent } from './drugsSearch/drugsSearch.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FieldsCreatorComponent } from '../forms/fieldCreator/fieldCreator.component';
import { FieldsRemoverComponent } from '../forms/fieldsRemover/fieldsRemover.component';
import { FormsCreatorComponent } from '../forms/formsCreator/formsCreator.component';
import { MdlSelectModule } from '@angular2-mdl-ext/select';


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
        MdlSelectModule
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
        DrugsSearchComponent,
        FieldsCreatorComponent,
        FieldsRemoverComponent,
        FormsCreatorComponent
    ]
})
export class PagesModule {
}
