import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            // { path: 'treeview', component: TreeViewComponent }
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
