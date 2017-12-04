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
            roles: ['ROLE_DOCTOR', 'ROLE_ADMIN', 'ROLE_RECEPTIONIST'],
            icon: 'person_add',
            color: '#845ef7'
        },
        {
            title: 'DoctorCreator',
            buttonLabel: 'Create',
            link: '/pages/createDoctor',
            roles: ['ROLE_ADMIN', 'ROLE_RECEPTIONIST'],
            icon: 'person_add',
            color: '#51cf66',
        },
        {
            title: 'TimeslotCreator',
            buttonLabel: 'Create',
            link: '/pages/createTimeslot',
            roles: ['ROLE_DOCTOR', 'ROLE_ADMIN', 'ROLE_RECEPTIONIST'],
            icon: 'playlist_add',
            color: '#fcc419'
        },
        {
            title: 'ProceedWithAppoinment',
            buttonLabel: 'Proceed',
            link: '/pages/proceedAppointment',
            roles: ['ROLE_DOCTOR', 'ROLE_ADMIN'],
            icon: 'input',
            color: '#ff6b6b',
        },
        {
            title: 'SearchForPatient',
            buttonLabel: 'Search',
            link: '/pages/patientSearch',
            roles: ['ROLE_DOCTOR', 'ROLE_ADMIN', 'ROLE_RECEPTIONIST'],
            icon: 'search',
            color: '#cc5de8'
        },
        {
            title: 'SearchForDrugs',
            buttonLabel: 'Search',
            link: '/pages/drugsSearch',
            roles: ['ROLE_DOCTOR', 'ROLE_ADMIN'],
            icon: 'search',
            color: '#329af0'
        },
        {
            title: 'FormsCreator',
            buttonLabel: 'Create',
            link: '/pages/formsCreator',
            roles: ['ROLE_DOCTOR', 'ROLE_ADMIN'],
            icon: 'content_paste',
            color: '#22b8cf'
        },
        {
            title: 'MyProfile',
            buttonLabel: 'Check',
            link: '/dashboard',
            roles: ['ROLE_PATIENT', 'ROLE_DOCTOR', 'ROLE_ADMIN', 'ROLE_RECEPTIONIST'],
            icon: 'person',
            color: '#20c997'
        },
        {
            title: 'ShowTimeTable',
            buttonLabel: 'Show',
            link: '/pages/timeTable',
            roles: ['ROLE_DOCTOR', 'ROLE_ADMIN', 'ROLE_RECEPTIONIST'],
            icon: 'date_range',
            color: '#5c7cfa'
        },
        {
            title: 'MyVisits',
            buttonLabel: 'Show',
            link: '/pages/myAppointments',
            roles: ['ROLE_DOCTOR', 'ROLE_PATIENT', 'ROLE_ADMIN'],
            icon: 'perm_contact_calendar',
            color: '#ff922b'
        },
    ];
    private router: Router;

    constructor(private authService: AuthenticationService) {
    }

}
