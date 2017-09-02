import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { MedcomComponent } from './medcom.component';
import { DicomArchiveComponent } from './dicom-archive/dicom-archive.component';
import { ProceduresScheduleComponent } from './procedures-schedule/procedures-schedule.component';
import { ModalitiesComponent } from './modalities/modalities.component';


export const routes: Routes = [
    {
        path: '',
        component: MedcomComponent,
        children: [
            { path: 'dicom-archive', component: DicomArchiveComponent },
            { path: 'procedures-schedule', component: ProceduresScheduleComponent },
            { path: 'modalities', component: ModalitiesComponent },
        ],
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
