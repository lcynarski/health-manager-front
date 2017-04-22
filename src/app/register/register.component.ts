import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { AlertService, UserService } from '../_services/index';

@Component({

    templateUrl: 'register.component.html',
    styleUrls: ['./register.component.scss']
})

export class RegisterComponent {
    model: any = {};
    loading = false;

    constructor(
        private http: Http,
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }

    register() {
        // this.loading = true;
        // console.log(this.model)
        // this.userService.create(this.model)
        //     .subscribe(
        //         data => {
        //             this.alertService.success('Registration successful', true);
        //             this.router.navigate(['/login']);
        //         },
        //         error => {
        //             this.alertService.error(error._body);
        //             this.loading = false;
        //         });

        console.log(this.http);

        this.http.get('192.168.1.12:8080/users')
            .subscribe(
                data => {console.log(data);},
                err => {console.log("error");},
                () => console.log("vevervwefvewswfc")
            );
    }
}