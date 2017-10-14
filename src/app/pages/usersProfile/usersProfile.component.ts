import { Component, ViewChild, AfterViewInit, OnInit, EventEmitter, Output } from '@angular/core';
import { Validators } from '@angular/forms';

import { UserService } from '../../_services/index';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { PersonalDetails } from '../../_models/personalDetails';
import { Router } from '@angular/router';
import { DynamicFormComponent } from '../../components/dynamic-form/containers/dynamic-form/dynamic-form.component';
import { FieldConfig } from '../../components/dynamic-form/models/field-config.interface';

@Component({
    selector: 'users-profile',
    styleUrls: ['./usersProfile.component.scss'],
    templateUrl: './usersProfile.component.html'
})

export class UsersProfileComponent implements OnInit {
    public personalDetails: PersonalDetails;
    public account: Account;
    public form: DynamicFormComponent;

    constructor(private http: Http,
                private router: Router,
                private userService: UserService,) {
    }

    config: FieldConfig[] = [
        {
            type: 'input',
            label: 'First Name',
            name: 'firstName',
            placeholder: 'First Name'
        },
        {
            type: 'input',
            label: 'Last Name',
            name: 'lastName',
            placeholder: 'Last Name'
        },
        {
            type: 'input',
            label: 'Date of birth',
            name: 'birthdate',
            placeholder: 'Date'
        },
        {
            type: 'input',
            label: 'PESEL',
            name: 'pesel',
            placeholder: 'PESEL'
        },
        {
            type: 'select',
            label: 'Gender',
            name: 'gender',
            options: ['Male', 'Female', 'Other'],
            placeholder: 'Select an option'
        },
        {
            type: 'input',
            label: 'Phone Number',
            name: 'phoneNumber',
            placeholder: 'Phone Number'
        },
        {
            type: 'input',
            label: 'Country',
            name: 'country',
            placeholder: 'Country'
        },
        {
            type: 'input',
            label: 'City',
            name: 'city',
            placeholder: 'City'
        },
        {
            type: 'input',
            label: 'Street',
            name: 'street',
            placeholder: 'Street'
        },
        {
            type: 'input',
            label: 'Building',
            name: 'buildingNumber',
            placeholder: 'Building number'
        },
        {
            type: 'input',
            label: 'Flat',
            name: 'flatNumber',
            placeholder: 'Flat number'
        },
        {
            label: 'Submit',
            name: 'submit',
            type: 'button'
        }
    ];

    public ngOnInit(): void {
        this.getPersonalDetails();
        // this.getAccount();
    }

    submit(value) {
        const personalDetails = { account: { personalDetails: { ...value } } };
        // this.patientService.savePatient(personalDetails)
        //     .subscribe((data) => console.log(data));
        console.log(personalDetails)
    }

    private getAccount() {
        this.userService.getAccount().subscribe(
            (data) => {
                this.account = data;
            }
        );
    }

    private getPersonalDetails() {
        this.userService.getPersonalDetails().subscribe(
            (data) => {
                this.personalDetails = data;
                console.log(data);
            }
        );
    }

    private saveProfilePicture(photo) {
        debugger;
        if (photo) {
            this.userService.saveProfilePicture('14', photo).subscribe(
                (data) => {
                    console.log('Save profile picture response: ' + data);
                });
        }
    }
}