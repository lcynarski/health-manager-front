import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../_services/authentication.service';

@Component({
    selector: 'dashboard',
    styleUrls: ['./dashboard.component.scss'],
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
    public widgets: any[] = [
        {
            title: 'PatientCreator',
            buttonLabel: 'Create',
            link: '/pages/createPatient',
            roles: ['ROLE_PATIENT', 'ROLE_DOCTOR', 'ROLE_ADMIN']
        },
        {
            title: 'DoctorCreator',
            buttonLabel: 'Create',
            link: '/pages/createDoctor',
            roles: ['ROLE_DOCTOR', 'ROLE_ADMIN']
        },
        {
            title: 'TimeslotCreator',
            buttonLabel: 'Create',
            link: '/pages/createTimeslot',
            roles: ['ROLE_DOCTOR', 'ROLE_ADMIN']
        },
        {
            title: 'ProceedWithAppoinment',
            buttonLabel: 'Proceed',
            link: '/pages/proceedAppointment',
            roles: ['ROLE_PATIENT', 'ROLE_DOCTOR', 'ROLE_ADMIN']
        },
        {
            title: 'SearchForPatient',
            buttonLabel: 'Search',
            link: '/pages/patientSearch',
            roles: ['ROLE_DOCTOR', 'ROLE_ADMIN']
        },
        {
            title: 'SearchForDrugs',
            buttonLabel: 'Search',
            link: '/pages/drugsSearch',
            roles: ['ROLE_DOCTOR', 'ROLE_ADMIN']
        },
        {
            title: 'FormsCreator',
            buttonLabel: 'Go to creator',
            link: '/pages/formsCreator',
            roles: ['ROLE_DOCTOR', 'ROLE_ADMIN']
        },
        {
            title: 'Look into your profile',
            buttonLabel: 'Check',
            link: '/dashboard',
            roles: ['ROLE_PATIENT', 'ROLE_ADMIN']
        },
        {
            title: 'ShowTimeTable',
            buttonLabel: 'Show',
            link: '/pages/timeTable',
            roles: ['ROLE_DOCTOR', 'ROLE_ADMIN']
        },
        {
            title: 'MyVisits',
            buttonLabel: 'Show',
            link: '/pages/myAppointments',
            roles: ['ROLE_DOCTOR', 'ROLE_PATIENT']
        },
    ];
    private router: Router;

    constructor(private authService: AuthenticationService) {
    }

}
