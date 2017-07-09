import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Http, Headers, RequestOptions, Response} from '@angular/http';

import {AlertService, UserService} from '../_services/index';

@Component({
    templateUrl: 'register.component.html',
    styleUrls: ['./register.component.scss']
})

export class RegisterComponent {
    private model: any = {};
    private loading = false;

    constructor(private http: Http,
                private router: Router,
                private userService: UserService,
                private alertService: AlertService) {
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
