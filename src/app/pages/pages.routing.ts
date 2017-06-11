import { Routes, RouterModule } from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
import {LoginComponent} from '../login/login.component';
import {RegisterComponent} from '../register/register.component';

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
        path: 'pages',
        component: Pages,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'patientsList', loadChildren: './patientsList/patientsList.module#PatientsListModule' }
            // { path: 'components', loadChildren: './components/components.module#ComponentsModule' },
            // { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
            // { path: 'ui', loadChildren: './ui/ui.module#UiModule' },
            // { path: 'forms', loadChildren: './forms/forms.module#FormsModule' },
            // { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
            // { path: 'maps', loadChildren: './maps/maps.module#MapsModule' }
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
