import { Routes, RouterModule } from '@angular/router';


import {TimeTableComponent} from "./timeTable.component";

const routes: Routes = [
    {
        path: '',
        component: TimeTableComponent,
    }
];

export const routing = RouterModule.forChild(routes);
