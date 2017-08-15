import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../_services/authentication.service';
import {JwtHelper} from 'angular2-jwt';

@Component({
    selector: 'dashboard',
    styleUrls: ['./dashboard.component.scss'],
    templateUrl: './dashboard.component.html'
})
export class Dashboard {
    public currentUsersRole;
    // public widgets = [
    //     doctorsCreator: {
    //         title: 'Doctors creator',
    //         buttonLabel: 'create',
    //         link: '/pages/createDoctor',
    //         roles: 'PATIENT'
    //     }
    // ]
    private router: Router;


    constructor(private authService: AuthenticationService) {
        this.currentUsersRole = authService.getRole();
    }

    public goToCreatePatient = () => {
        this.router.navigate(['/createPatient']);
    }
}

