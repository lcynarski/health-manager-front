import { Routes, RouterModule } from '@angular/router';

import { VisitsCalendarComponent } from './visitsCalendar.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
    {
        path: '',
        component: VisitsCalendarComponent,
        // children: [
        //     { path: 'patientDetails/:patientId', component: PatientDetailsComponent },
        //     ]
    }
];

export const routing = RouterModule.forChild(routes);
