import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { HomeComponent } from './home/index';
import { WelcomeComponent } from './welcome/index';
import { AuthGuard } from './_guards/index';
import {PatientsListComponent} from './pages/patientsList/index';
import { PatientDetailsComponent } from './pages/patientDetails/index';
import { PersonalDetailsFormComponent } from './personal-details-form/index';
import { FieldsCreatorComponent } from "./forms/fieldCreator/fieldCreator.component";
import {FormsCreatorComponent} from "./forms/formsCreator/formsCreator.component";

const routes: Routes = [
    // { path: '', component: WelcomeComponent },
    // { path: 'login', component: LoginComponent },
    // { path: 'register', component: RegisterComponent },
    // { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    // { path: 'medcom', component: MedcomComponent },
    // { path: 'patientsList', component: PatientsListComponent },
    // { path: 'patientDetails', component: PatientDetailsComponent },

    // otherwise redirect to home
    // { path: '', redirectTo: 'pages', pathMatch: 'full' },
    { path: '', component: WelcomeComponent },
    { path: 'personalDetails', component: PersonalDetailsFormComponent },
    { path: 'fieldsCreator', component: FieldsCreatorComponent },
    { path: 'formsCreator', component: FormsCreatorComponent },
    { path: '**', redirectTo: 'pages/dashboard' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true , enableTracing: true });
