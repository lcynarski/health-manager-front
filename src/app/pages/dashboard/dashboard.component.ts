import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
            roles: ['ROLE_PATIENT', 'ROLE_DOCTOR', 'ROLE_ADMIN']
        },
        {
            title: "Doctor's creator",
            buttonLabel: 'Create',
            link: '/pages/createDoctor',
            roles: ['ROLE_DOCTOR', 'ROLE_ADMIN']
        },
        {
            title: 'Timeslot creator',
            buttonLabel: 'Create',
            link: '/pages/createTimeslot',
            roles: ['ROLE_DOCTOR', 'ROLE_ADMIN']
        },
        {
            title: 'Proceed with an appointment',
            buttonLabel: 'Proceed',
            link: '/pages/proceedAppointment',
            roles: ['ROLE_PATIENT', 'ROLE_DOCTOR', 'ROLE_ADMIN']
        },
        {
            title: 'Search for a patient',
            buttonLabel: 'Search',
            link: '/pages/patientSearch',
            roles: ['ROLE_DOCTOR', 'ROLE_ADMIN']
        },
        {
            title: 'Search for drugs',
            buttonLabel: 'Search',
            link: '/pages/drugsSearch',
            roles: ['ROLE_DOCTOR', 'ROLE_ADMIN']
        },
        {
            title: 'Forms creator',
            buttonLabel: 'Go to creator',
            link: '/formsCreator',
            roles: ['ROLE_DOCTOR', 'ROLE_ADMIN']
        },
        {
            title: 'Look into your profile',
            buttonLabel: 'Check',
            link: '/dashboard',
            roles: ['ROLE_PATIENT', 'ROLE_ADMIN']
        },
    ];
    private router: Router;
}
