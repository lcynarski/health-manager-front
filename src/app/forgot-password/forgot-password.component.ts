import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, UserService } from '../_services/index';

@Component({
    templateUrl: 'forgot-password.component.html',
    styleUrls: ['../login/login.component.scss']
})

export class ForgotPasswordComponent {
    public model: any = {};

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private alertService: AlertService,
        private userService: UserService) { }

    public myFunc() {
        console.log('inside submit');
        this.userService.resetPassword(this.model.email)
            .subscribe(
                (data) => {
                    console.log('Forgot password component data: ' + data);
                    // this.router.navigate(['/dashboard']);
                },
                (error) => {
                    console.log('Forgot password component error: ' + error);
                    this.alertService.error(error._body);
                });
    }
}
