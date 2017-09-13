import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Http, Headers, RequestOptions, Response} from '@angular/http';

import {AlertService, UserService} from '../_services/index';
import {DynamicFormComponent} from "../components/dynamic-form/containers/dynamic-form/dynamic-form.component";
import registerConfig from "../_forms-configs/register.config";

@Component({
    selector: 'register',
    templateUrl: 'register.component.html',
    styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements AfterViewInit {
    @ViewChild(DynamicFormComponent) registerForm: DynamicFormComponent;

    private model: any = {};
    private loading = false;
    public config = registerConfig;

    constructor(private http: Http,
                private router: Router,
                private userService: UserService,
                private alertService: AlertService) {
    }

    ngAfterViewInit() {
        // let previousValid = this.registerForm.valid;
        // this.registerForm.changes.subscribe(() => {
        //     if (this.registerForm.valid !== previousValid) {
        //         previousValid = this.registerForm.valid;
        //         this.registerForm.setDisabled('submit', !previousValid);
        //     }
        // });
        // this.registerForm.setDisabled('submit', true);
    }

    private register() {
        console.log('register');
        this.loading = true;
        console.log(this.model);
        this.userService.create(this.model)
            .subscribe(
                (data) => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                (error) => {
                    this.alertService.error(error._body);
                    this.loading = false;
                });
    }
}
