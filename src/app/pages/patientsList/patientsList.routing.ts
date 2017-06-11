import { Routes, RouterModule } from '@angular/router';

import { PatientsListComponent } from './patientsList.component';
import { PatientsListItemComponent } from './patients-list-item.component';
import { PatientDetailsComponent } from './patientDetails/patientDetails.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
    {
        path: '',
        component: PatientsListComponent
    }
];

export const routing = RouterModule.forChild(routes);
