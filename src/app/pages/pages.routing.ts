import { RouterModule, Routes } from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { PatientDetailsComponent } from './patientDetails/patientDetails.component';
import { VisitsCalendarComponent } from './visitsCalendar/visitsCalendar.component';
import { VisitListComponent } from './visitList/visitList.component';
import { TimeTableComponent } from './timeTable/timeTable.component';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { CreatePatientComponent } from './createPatient/createPatient.component';
import { CreateDoctorComponent } from './createDoctor/createDoctor.component';
import { CreateTimeslotComponent } from './createTimeslot/createTimeslot.component';
import { UsersProfileComponent } from './usersProfile/usersProfile.component';
import { PatientSearchComponent } from './patientSearch/patientSearch.component';
import { FormsCreatorComponent } from '../forms/formsCreator/formsCreator.component';
import { FieldsCreatorComponent } from '../forms/fieldCreator/fieldCreator.component';
import { ProceedAppointmentComponent } from './proceedApoinment/proceed-appointment.component';
import { MedcomModule } from '../medcom/medcom.module';
import { DrugsSearchComponent } from './drugsSearch/drugsSearch.component';
import { WelcomeComponent } from '../welcome/welcome.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import * as path from 'path';
import { DrugDetailsComponent } from './drugDetails/drugDetails.component';

export const routes: Routes = [
    {
        path: '',
        component: WelcomeComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'forgotPassword',
        component: ForgotPasswordComponent
    },
    {
        path: 'changePassword',
        component: ChangePasswordComponent
    },
    {
        path: 'pages',
        component: Pages,
        children: [
            // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'patientsList', loadChildren: './patientsList/patientsList.module#PatientsListModule' },
            { path: 'doctorsList', loadChildren: './doctorsList/doctorsList.module#DoctorsListModule' },
            { path: 'patientDetails/:patientId', component: PatientDetailsComponent },
            { path: 'doctor/:doctorId', component: VisitsCalendarComponent },
            { path: 'myAppointments', component: VisitListComponent },
            { path: 'timeTable', component: TimeTableComponent },
            { path: 'createPatient', component: CreatePatientComponent },
            { path: 'createDoctor', component: CreateDoctorComponent },
            { path: 'createTimeslot', component: CreateTimeslotComponent },
            { path: 'usersProfile', component: UsersProfileComponent },
            { path: 'patientSearch', component: PatientSearchComponent },
            { path: 'medcom', loadChildren: () => MedcomModule },
            { path: 'proceedAppointment', component: ProceedAppointmentComponent },
                // children: [
                //     { path: 'proceedAppointment/:type/:id', component: ProceedAppointmentComponent },
                // ]
            { path: 'drugsSearch', component: DrugsSearchComponent },
            { path: 'drugDetails/:drugId', component: DrugDetailsComponent },
            { path: 'fieldsCreator', component: FieldsCreatorComponent },
            { path: 'formsCreator', component: FormsCreatorComponent },
            { path: 'formsCreator/:formId', component: FormsCreatorComponent },
            // { path: 'medcom', component: MedcomComponent }
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
