import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../_services/index';
import { FormControl, Validators } from '@angular/forms';
import { MdlDialogService } from '@angular-mdl/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
    templateUrl: 'forgot-password.component.html',
    styleUrls: ['../login/login.component.scss']
})

export class ForgotPasswordComponent implements OnInit {
    public model: any = {};
    private loading = false;
    private returnUrl: string;
    private email = new FormControl('', [Validators.required, Validators.email]);
    translations = {
        succResetPassword: 'Succesfully reset password. Check your mailbox',
        sthWentWrong: 'Something went wrong. Try again.'
    };


    constructor(private router: Router,
                private route: ActivatedRoute,
                private userService: UserService,
                private translate: TranslateService,
                private dialogService: MdlDialogService) {
    }

    public ngOnInit() {
        this.translate.get('SuccResetPassword')
            .subscribe((response) => this.translations.succResetPassword = response);
        this.translate.get('SthWentWrong')
            .subscribe((response) => this.translations.sthWentWrong = response);
    }

    public onSubmit() {
        this.userService.resetPassword(this.model.email)
            .subscribe(
                (data) => {
                    const result = this.dialogService.alert(this.translations.succResetPassword);
                    result.onErrorResumeNext().subscribe(() => {
                        this.router.navigate(['/']);
                    });
                },
                (error) => {
                    this.dialogService.alert(this.translations.sthWentWrong);
                });
    }
}
