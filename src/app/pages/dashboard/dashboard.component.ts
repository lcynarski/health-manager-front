import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../_services/authentication.service';

@Component({
    selector: 'dashboard',
    styleUrls: ['./dashboard.component.scss'],
    templateUrl: './dashboard.component.html'
})
export class Dashboard {
    public currentUsersRole;
    private router: Router;

    constructor(private authService: AuthenticationService) {
        this.currentUsersRole = authService.getRole();
        console.log(authService.getRole());
    }

    public goToCreatePatient = () => {
        this.router.navigate(['/createPatient']);
    }
}
