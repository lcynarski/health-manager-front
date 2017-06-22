import { Component, OnInit } from '@angular/core';

import {UserService} from '../_services/user.service';
import {ChangePassword} from '../_models/changePassword';

@Component({
    selector: 'change-password',
    templateUrl: 'change-password.component.html'
})
export class ChangePasswordComponent {

    private updatePasswordData: ChangePassword;
    private output: any;

    constructor(private userService: UserService) { }

    // Submit Data to Backend
    public onSubmit() {

        this.output = null;

        this.userService.changePassword(this.updatePasswordData).subscribe(
            (res) => {
                console.log(res);
            }, (error) => {
                console.log(error);
            }
        );
    }
}
