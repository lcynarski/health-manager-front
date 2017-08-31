import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../_services/authentication.service';
import {JwtHelper} from 'angular2-jwt';

@Component({
    selector: 'dashboard',
    styleUrls: ['./dashboard.component.scss'],
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
    public widgets: any[] = [
        {
            title: "Patient's creator",
            buttonLabel: 'Create',
            link: '/pages/createPatient',
            roles: ['DOCTOR', 'ADMIN']
        },
        {
            title: "Doctor's creator",
            buttonLabel: 'Create',
            link: '/pages/createDoctor',
            roles: ['ADMIN']
        },
        {
            title: "Timeslot creator",
            buttonLabel: 'Create',
            link: '/pages/createTimeslot',
            roles: ['DOCTOR','ADMIN']
        },
        {
            title: 'Proceed with an appointment',
            buttonLabel: 'Proceed',
            link: '/pages/proceedAppointment',
            roles: ['DOCTOR', 'ADMIN']
        },
        {
            title: 'Search for a patient',
            buttonLabel: 'Search',
            link: '/pages/patientSearch',
            roles: ['DOCTOR', 'ADMIN']
        },
        {
            title: 'Forms creator',
            buttonLabel: 'Go to creator',
            link: '/pages/patientSearch',
            roles: ['DOCTOR', 'ADMIN']
        },
        {
            title: 'Look into your profile',
            buttonLabel: 'Check',
            link: '/dashboard',
            roles: ['PATIENT', 'ADMIN']
        },
    ];
    private router: Router;
}
