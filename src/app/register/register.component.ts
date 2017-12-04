import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { AlertService, UserService } from '../_services/index';
import { DynamicFormComponent } from '../components/dynamic-form/containers/dynamic-form/dynamic-form.component';
import registerConfig from '../_forms-configs/register.config';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'register',
    templateUrl: 'register.component.html',
    styleUrls: ['./register.component.scss']
})

export class RegisterComponent {
    @ViewChild(DynamicFormComponent) registerForm: DynamicFormComponent;

    private model: any = {};
    private loading = false;
    public config = registerConfig;

    constructor(private http: Http,
                private router: Router,
                private userService: UserService,
                private alertService: AlertService,
                public snackBar: MatSnackBar) {
    }

    private register(data) {
        console.log(data);
        this.loading = true;
        console.log(this.model);
        const { email, password, ...personalDetails } = data;
        const registerData = {
            email,
            password,
            personalDetails
        };
        console.log(registerData)
        this.userService.create(registerData)
            .subscribe(
                (data) => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                (error) => {
                    this.alertService.error(error._body);
                    this.loading = false;
                    this.snackBar.open("Error during register", undefined, {
                        duration: 4000,
                        extraClasses: ['error-snackbar'],
                        verticalPosition: 'top'
                    });
                });
    }
}
