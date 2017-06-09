import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'angular2-social-login';
import { AlertService, AuthenticationService } from '../_services/index';

@Component({
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    error = '';
    returnUrl: string;
    public user = {};
    sub: any = {};

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        public _auth: AuthService) { }

    signIn(provider = ""){
        this.sub = this._auth.login(provider).subscribe(
            (data) => {
                console.log(data);this.user=data;}
        );
    }

    logout(){
        this._auth.logout().subscribe(
            (data)=>{console.log(data);this.user=null;}
        );
    }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.email, this.model.password)
            .subscribe(
                (data) => {
                    this.router.navigate([this.returnUrl]);
                },
                (error) => {
                    this.alertService.error(error._body);
                    this.loading = false;
                });
    }
}
