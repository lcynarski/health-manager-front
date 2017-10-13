import { Routes, RouterModule } from '@angular/router';


import {TimeTableComponent} from "./timeTable.component";

// noinspection TypeScriptValidateTypes
const routes: Routes = [
    {
        path: '',
        component: TimeTableComponent,
        // children: [
        //     { path: 'doctor/:doctorId', component: VisitsCalendarComponent},
        //     ]
    }
];

export const routing = RouterModule.forChild(routes);
