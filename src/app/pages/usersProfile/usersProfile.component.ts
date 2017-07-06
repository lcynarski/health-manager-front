import {Component, ViewChild, AfterViewInit, OnInit} from '@angular/core';
import { Validators } from '@angular/forms';

import { FieldConfig } from '../../components/dynamic-form/models/field-config.interface';
import { DynamicFormComponent } from '../../components/dynamic-form/containers/dynamic-form/dynamic-form.component';
import { UserService } from '../../_services/index';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { PersonalDetails } from '../../_models/personal-details';
import {Router} from '@angular/router';

@Component({
    selector: 'users-profile',
    styleUrls: ['./usersProfile.component.scss'],
    templateUrl: './usersProfile.component.html'
})

export class UsersProfileComponent  implements OnInit {
    public personalDetails: PersonalDetails;

    constructor(private http: Http,
                private router: Router,
                private userService: UserService) {
    }

    public ngOnInit(): void {
        this.getPersonalDetails();
        // this.personalDetails = {
        //     firstName: "Jam",
        //     lastName: "Lasica",
        //     gender: "male",
        //     pesel: "95010101011",
        //     birthdate: 222222222,
        //     city: "Nora",
        //     buildingNumber: 0,
        //     country: "pustynia",
        //     street: "vvvv",
        //     phoneNumber: 202020202,
        //     flatNumber: 2
        // };
    }

    submit(value: {[name: string]: any}) {
    }

    private getPersonalDetails() {
        this.userService.getPersonalDetails().subscribe(
            (data) => { this.personalDetails = data ; console.log(data);}
        );
    }
}
