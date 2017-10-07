import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { AlertService, UserService } from '../../_services/index';
import { PersonalDetails } from '../../_models/personalDetails';
import {error} from 'util';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    templateUrl: 'proceed-appointment.component.html',
    styleUrls: ['./proceed-appointment.component.scss']
})

export class ProceedAppointmentComponent implements OnInit {

    public activeIndex = 0;
    public disableTargaryens = true;
    public myArray: string[] = null;

    isLinear = false;
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;

    constructor(private http: Http,
                private router: Router,
                private userService: UserService,
                private alertService: AlertService,
                private _formBuilder: FormBuilder) {
    }

    public tabChanged({index}) {
        this.activeIndex = index;
    }

    ngOnInit() {
        // Simulates a later change of tabs
        setTimeout(() => {
            this.myArray = ['a', 'b', 'c'];
        }, 1000);
        this.firstFormGroup = this._formBuilder.group({
            firstCtrl: ['', Validators.required]
        });
        this.secondFormGroup = this._formBuilder.group({
            secondCtrl: ['', Validators.required]
        });
    }

    private onSubmit() {
        // console.log('debug');
        // console.log(this.personalDetails);
        //
        // this.userService.updatePersonalDetails(this.personalDetails)
        //     .subscribe(
        //         (data) => {
        //             this.alertService.success('Personal data updated successfully', true);
        //         },
        //         (error) => {
        //             this.alertService.error(error._body);
        //         });
    }

    private getPersonalDetails() {
        // this.userService.getPersonalDetails().subscribe(
        //     (data) => { this.personalDetails = data; },
        //     (error) => { this.alertService.error(error._body); }
        // );
    }

}
