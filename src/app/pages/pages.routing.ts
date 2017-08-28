import { Routes, RouterModule } from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
import {LoginComponent} from '../login/login.component';
import {RegisterComponent} from '../register/register.component';
import {PatientDetailsComponent} from './patientDetails/patientDetails.component';
import {MedcomComponent} from "../medcom/medcom.component";
import {VisitsCalendarComponent} from "./visitsCalendar/visitsCalendar.component";
import {ForgotPasswordComponent} from '../forgot-password/forgot-password.component';
import {CreatePatientComponent} from './createPatient/createPatient.component';
import {CreateDoctorComponent} from './createDoctor/createDoctor.component';
import {UsersProfileComponent} from './usersProfile/usersProfile.component';
import {PatientSearchComponent} from "./patientSearch/patientSearch.component";
import {FormsCreatorComponent} from "../forms/formsCreator/formsCreator.component";
import {FieldsCreatorComponent} from "../forms/fieldCreator/fieldCreator.component";

export const routes: Routes = [
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
        path: 'pages',
        component: Pages,
        children: [
            // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'patientsList', loadChildren: './patientsList/patientsList.module#PatientsListModule' },
            { path: 'doctorsList', loadChildren: './doctorsList/doctorsList.module#DoctorsListModule' },
            { path: 'patientDetails/:patientId', component: PatientDetailsComponent },
            { path: 'doctor/:doctorId', component: VisitsCalendarComponent },
            { path: 'createPatient', component: CreatePatientComponent },
            { path: 'createDoctor', component: CreateDoctorComponent },
            { path: 'usersProfile', component: UsersProfileComponent },
            { path: 'patientSearch', component: PatientSearchComponent },
            { path: 'fieldsCreator', component: FieldsCreatorComponent },
            { path: 'formsCreator', component: FormsCreatorComponent },
            { path: 'formsCreator/:formId', component: FormsCreatorComponent },
            { path: 'medcom', component: MedcomComponent }
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
