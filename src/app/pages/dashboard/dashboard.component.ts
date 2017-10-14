import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {AuthenticationService} from "../../_services/authentication.service";

@Component({
    selector: 'dashboard',
    styleUrls: ['./dashboard.component.scss'],
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
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
            title: 'Show time table',
            buttonLabel: 'Show',
            link: '/pages/timeTable',
            roles: ['ROLE_DOCTOR', 'ROLE_ADMIN']
        },
    ];
    private router: Router;

    constructor(private authService: AuthenticationService ) {}

    public ngOnInit() {
        console.log('KURWA JEGO MAC', this.authService.getRole());
    }
}
