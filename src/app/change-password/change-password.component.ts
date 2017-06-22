import { Component, OnInit } from '@angular/core';

import {UserService} from '../_services/user.service';
import {ChangePassword} from '../_models/changePassword';

@Component({
    selector: 'change-password',
    templateUrl: 'change-password.component.html'
})
export class ChangePasswordComponent {

    private updatePasswordData = new ChangePassword();

    constructor(private userService: UserService) { }

    public onSubmit() {
        console.log('Change password component' + this.updatePasswordData);
        this.userService.changePassword(this.updatePasswordData).subscribe(
            (res) => {
                console.log(res);
            }, (error) => {
                console.log(error);
            }
        );
    }
}
