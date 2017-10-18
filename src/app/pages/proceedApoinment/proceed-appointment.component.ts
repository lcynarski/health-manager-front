import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { AlertService, UserService } from '../../_services/index';
import { PersonalDetails } from '../../_models/personalDetails';
import { error } from 'util';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientService } from '../../_services/patient.service';
import { Patient } from '../../_models/patient';

@Component({
    providers: [PatientService],
    templateUrl: 'proceed-appointment.component.html',
    styleUrls: ['./proceed-appointment.component.scss']
})

export class ProceedAppointmentComponent implements OnInit {

    public activeIndex = 0;
    public disableTargaryens = true;
    public myArray: string[] = null;
    public patient: Patient;
    isLinear = false;
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;
    public form: FormGroup;
    public pesel = new FormControl('', Validators.required);


    constructor(private http: Http,
                private router: Router,
                private userService: UserService,
                private patientService: PatientService,
                private alertService: AlertService,
                private _formBuilder: FormBuilder) {
    }

    public tabChanged({ index }) {
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

        this.form = this._formBuilder.group({
            pesel: this.pesel
        });
    }

    // private onSubmit() {
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
    // }

    private getPersonalDetails() {
        // this.userService.getPersonalDetails().subscribe(
        //     (data) => { this.personalDetails = data; },
        //     (error) => { this.alertService.error(error._body); }
        // );
    }

    private getPatientByPesel(pesel) {
        this.patientService.getPatientByPesel(pesel)
            .subscribe((patients) => {
                this.patient = patients;
            });
    }

    public onSubmit(value) {
        console.log(this.form.value.pesel);
        this.getPatientByPesel(this.form.value.pesel);
    }

}
