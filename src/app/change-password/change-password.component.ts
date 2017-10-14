import { Component, OnInit } from '@angular/core';

import { UserService } from '../_services/user.service';
import { ChangePassword } from '../_models/changePassword';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { MdlDialogService } from '@angular-mdl/core';

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

    constructor(private userService: UserService,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private dialogService: MdlDialogService) {
    }

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe((params: Params) => {
            // let userId = params['userId'];
            console.log(params);
            this.params = params;
        });
    }

    public onSubmit() {
        console.log('Change password component' + this.updatePasswordData);
        this.userService.changePassword(this.model.newPassword, this.params).subscribe(
            (res) => {
                const result = this.dialogService.alert('Succesfully changed password. Click OK and sign in');
                result.onErrorResumeNext().subscribe(() => {
                    this.router.navigate(['/']);
                });
            }, (error) => {
                console.log(error);
                this.dialogService.alert('Something went wrong. Try again.');
            }
        );
    }
}
