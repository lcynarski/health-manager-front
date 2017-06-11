import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { HomeComponent } from './home/index';
import { WelcomeComponent } from './welcome/index';
import { AuthGuard } from './_guards/index';
import { MedcomComponent } from './medcom/index';
import {PatientsListComponent} from './pages/patientsList/index';
import { PatientDetailsComponent } from './pages/patientsList/patientDetails/index';

const routes: Routes = [
    // { path: '', component: WelcomeComponent },
    // { path: 'login', component: LoginComponent },
    // { path: 'register', component: RegisterComponent },
    // { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    // { path: 'medcom', component: MedcomComponent },
    // { path: 'patientsList', component: PatientsListComponent },
    // { path: 'patientDetails', component: PatientDetailsComponent },

    // otherwise redirect to home
    { path: '', redirectTo: 'pages', pathMatch: 'full' },
    { path: '**', redirectTo: 'pages/dashboard' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });
