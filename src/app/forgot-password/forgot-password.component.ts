import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../_services/index';
import { FormControl, Validators } from '@angular/forms';
import { MdlDialogService } from '@angular-mdl/core';

@Component({
    templateUrl: 'forgot-password.component.html',
    styleUrls: ['../login/login.component.scss']
})

export class ForgotPasswordComponent {
    public model: any = {};
    private loading = false;
    private returnUrl: string;
    private email = new FormControl('', [Validators.required, Validators.email]);

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private userService: UserService,
        private dialogService: MdlDialogService) { }

    public onSubmit() {
        console.log('inside submit ' + this.model.email);
        this.userService.resetPassword(this.model.email)
            .subscribe(
                (data) => {
                    console.log('Forgot password component data: ' + data);
                    const result = this.dialogService.alert('Succesfully reset password. Check your mailbox');
                    result.onErrorResumeNext().subscribe( () => {
                        this.router.navigate(['/']);
                    });
                },
                (error) => {
                    console.log('Forgot password component error: ' + error);
                    this.dialogService.alert('Something went wrong. Try again.');
                });
    }
}
