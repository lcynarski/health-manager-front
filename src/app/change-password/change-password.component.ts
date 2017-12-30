import { Component, OnInit } from '@angular/core';

import { UserService } from '../_services/user.service';
import { ChangePassword } from '../_models/changePassword';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { MdlDialogService } from '@angular-mdl/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'change-password',
    templateUrl: 'change-password.component.html',
    styleUrls: ['../login/login.component.scss']
})
export class ChangePasswordComponent implements OnInit {
    model: any = {};
    public params = {};
    private updatePasswordData = new ChangePassword();
    private newPassword = new FormControl('', [Validators.required, Validators.email]);
    translations = {
        succChangedPassword: 'Succesfully changed password. Click OK and sign in',
        sthWentWrong: 'Something went wrong. Try again.'
    };


    constructor(private userService: UserService,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private translate: TranslateService,
                private dialogService: MdlDialogService) {
    }

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe((params: Params) => {
            this.params = params;
        });

        this.translate.get('SuccChangedPassword')
            .subscribe((response) => this.translations.succChangedPassword = response);
        this.translate.get('SthWentWrong')
            .subscribe((response) => this.translations.sthWentWrong = response);
    }

    public onSubmit() {
        this.userService.changePassword(this.model.newPassword, this.params).subscribe(
            (res) => {
                const result = this.dialogService.alert(this.translations.succChangedPassword);
                result.onErrorResumeNext().subscribe(() => {
                    this.router.navigate(['/']);
                });
            }, (error) => {
                this.dialogService.alert(this.translations.sthWentWrong);
            }
        );
    }
}
