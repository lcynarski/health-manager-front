import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from '../_services';


@Injectable()
export class DoctorRoleGuard implements CanActivate {

    constructor(private authService: AuthenticationService) { }

    canActivate() {
        return (AuthenticationService.ROLE_DOCTOR === this.authService.getRole());
    }
}
