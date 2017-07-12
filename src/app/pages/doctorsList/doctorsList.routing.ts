import { Routes, RouterModule } from '@angular/router';


import {DoctorsListComponent} from "./doctorsList.component";
import {VisitsCalendarComponent} from "../visitsCalendar/visitsCalendar.component";

// noinspection TypeScriptValidateTypes
const routes: Routes = [
    {
        path: '',
        component: DoctorsListComponent,
        // children: [
        //     { path: 'doctor/:doctorId', component: VisitsCalendarComponent},
        //     ]
    }
];

export const routing = RouterModule.forChild(routes);
