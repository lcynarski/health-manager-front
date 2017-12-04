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
            roles: ['ROLE_DOCTOR', 'ROLE_ADMIN', 'ROLE_RECEPTIONIST']
        },
        {
            title: 'DoctorCreator',
            buttonLabel: 'Create',
            link: '/pages/createDoctor',
            roles: ['ROLE_ADMIN', 'ROLE_RECEPTIONIST']
        },
        {
            title: 'TimeslotCreator',
            buttonLabel: 'Create',
            link: '/pages/createTimeslot',
            roles: ['ROLE_DOCTOR', 'ROLE_ADMIN', 'ROLE_RECEPTIONIST']
        },
        {
            title: 'ProceedWithAppoinment',
            buttonLabel: 'Proceed',
            link: '/pages/proceedAppointment',
            roles: ['ROLE_DOCTOR', 'ROLE_ADMIN']
        },
        {
            title: 'SearchForPatient',
            buttonLabel: 'Search',
            link: '/pages/patientSearch',
            roles: ['ROLE_DOCTOR', 'ROLE_ADMIN', 'ROLE_RECEPTIONIST']
        },
        {
            title: 'SearchForDrugs',
            buttonLabel: 'Search',
            link: '/pages/drugsSearch',
            roles: ['ROLE_DOCTOR', 'ROLE_ADMIN']
        },
        {
            title: 'FormsCreator',
            buttonLabel: 'Create',
            link: '/pages/formsCreator',
            roles: ['ROLE_DOCTOR', 'ROLE_ADMIN']
        },
        {
            title: 'MyProfile',
            buttonLabel: 'Check',
            link: '/dashboard',
            roles: ['ROLE_PATIENT', 'ROLE_DOCTOR', 'ROLE_ADMIN', 'ROLE_RECEPTIONIST']
        },
        {
            title: 'ShowTimeTable',
            buttonLabel: 'Show',
            link: '/pages/timeTable',
            roles: ['ROLE_DOCTOR', 'ROLE_ADMIN', 'ROLE_RECEPTIONIST']
        },
        {
            title: 'MyVisits',
            buttonLabel: 'Show',
            link: '/pages/myAppointments',
            roles: ['ROLE_DOCTOR', 'ROLE_PATIENT', 'ROLE_ADMIN']
        },
    ];
    private router: Router;

    constructor(private authService: AuthenticationService) {
    }

}
