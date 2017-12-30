import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'angular2-social-login';
import { AlertService, AuthenticationService } from '../_services/index';
import { Http, RequestOptions, Headers } from '@angular/http';
import { AppConfig } from '../app.config';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'login',
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
    emailAddress = new FormControl('', [Validators.required, Validators.email]);
    hide = true;
    translations = {
        wrongLoginPassword: 'Wrong Login/Password'
    };

    constructor(private router: Router,
                private route: ActivatedRoute,
                private authenticationService: AuthenticationService,
                private alertService: AlertService,
                public _auth: AuthService,
                private http: Http,
                private config: AppConfig,
                private translate: TranslateService,
                public snackBar: MatSnackBar) {
    }

    public logout() {
        this._auth.logout().subscribe(
            (data) => {
                console.log(data);
                this.user = null;
            }
        );
    }

    public ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

        this.translate.get('WrongLoginPassword')
            .subscribe((response) => this.translations.wrongLoginPassword = response);
    }

    public login() {
        this.loading = true;
        this.authenticationService.login(this.model.email, this.model.password)
            .subscribe(
                (data) => {
                    this.router.navigate(['/dashboard']);
                },
                (error) => {
                    this.alertService.error(error._body);
                    this.loading = false;
                    this.snackBar.open(this.translations.wrongLoginPassword, undefined, {
                        duration: 4000,
                        extraClasses: ['error-snackbar'],
                        verticalPosition: 'top'
                    });
                });
    }

    public signIn(provider) {
        this.sub = this._auth.login(provider).subscribe(
            (data) => {
                console.log(data);
                const token = data['token'];
                const mail = data['email'];
                localStorage.setItem('currentUser', JSON.stringify({ mail, token }));
                const headers = new Headers({ Authorization: 'Bearer ' + token });
                const options = new RequestOptions({ headers })
                this.http.get(this.config.apiUrl + '/accounts/role', options)
                    .map((response) => {
                        this.authenticationService.role = response['_body'];
                        this.router.navigate(['/dashboard']);
                    }).subscribe();
            }
        );
    }

    getErrorMessage() {
        return this.emailAddress.hasError('required') ? 'You must enter a value' :
            this.emailAddress.hasError('email') ? 'Not a valid email' :
                '';
    }
}
