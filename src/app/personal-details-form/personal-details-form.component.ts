import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { AlertService, UserService } from '../_services/index';
import { PersonalDetails } from '../_models/personal-details';
import {error} from 'util';

@Component({
    templateUrl: 'personal-details-form.component.html',
    styleUrls: ['./personal-details-form.component.scss']
})

export class PersonalDetailsFormComponent implements OnInit {

    public personalDetails: PersonalDetails;

    constructor(private http: Http,
                private router: Router,
                private userService: UserService,
                private alertService: AlertService) {
    }

    public ngOnInit(): void {
        this.getPersonalDetails();
    }

    private onSubmit() {
        console.log('debug');
        console.log(this.personalDetails);

        this.userService.updatePersonalDetails(this.personalDetails)
            .subscribe(
                (data) => {
                    this.alertService.success('Personal data updated successfully', true);
                },
                (error) => {
                    this.alertService.error(error._body);
                });
    }

    private getPersonalDetails() {
        this.userService.getPersonalDetails().subscribe(
            (data) => { this.personalDetails = data; },
            (error) => { this.alertService.error(error._body); }
        );
    }

}
