import { Component, OnInit } from '@angular/core';

import {UserService} from '../_services/user.service';
import {ChangePassword} from '../_models/changePassword';
import {ActivatedRoute, Params} from "@angular/router";
import {FormControl, Validators} from "@angular/forms";

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
                private activatedRoute: ActivatedRoute) { }

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
                console.log(res);
            }, (error) => {
                console.log(error);
            }
        );
    }
}
