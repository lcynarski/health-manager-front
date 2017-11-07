import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { AlertService, UserService } from '../../_services/index';
import { PersonalDetails } from '../../_models/personalDetails';
import { error } from 'util';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientService } from '../../_services/patient.service';
import { Patient } from '../../_models/patient';
import { Observable } from 'rxjs/Observable';
import { DrugsService } from '../../_services/drugs.service';
import { standardExaminationConfig } from '../../_forms-configs'

@Component({
    providers: [PatientService, DrugsService],
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
    private params: Params;
    private drugs = [];
    public packs = [];
    private standardExaminationConfig = standardExaminationConfig;


    //==
    myControl: FormControl = new FormControl();

    options = [];

    filteredOptions: Observable<string[]>;
    //--

    foods = [
        {value: 'steak-0', viewValue: 'Steak'},
        {value: 'pizza-1', viewValue: 'Pizza'},
        {value: 'tacos-2', viewValue: 'Tacos'}
    ];


    constructor(private http: Http,
                private router: Router,
                private userService: UserService,
                private patientService: PatientService,
                private alertService: AlertService,
                private _formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private drugsService: DrugsService) {
    }

    public tabChanged({ index }) {
        this.activeIndex = index;
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            // let userId = params['userId'];
            console.log(params);
            const type = params['type'];
            const id = params['id']
            console.log('whats goin on: ', type, id)
        });

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

        this.filteredOptions = this.myControl.valueChanges
            .startWith(null)
            .map(val => val ? this.filter(val) : this.drugs.slice());
    }

    filter(val: string): string[] {
        val.length > 2 && this.drugsService.getDrugsByName(this.myControl.value)
            .subscribe((drugs) => {
                this.drugs = drugs;
            });
        return this.drugs.filter(option =>
            option.name.toLowerCase().indexOf(val.toLowerCase()) === 0);
    }

    private getDrugsByName() {
        this.drugsService.getDrugsByName(this.myControl.value)
            .subscribe((drugs) => {
                this.drugs = drugs;
            });
    }

    private getPacks() {
        const chosenDrug = this.drugs.filter((drug) => drug.name === this.myControl.value)[0];
        this.drugsService.getDrugDetails(chosenDrug.id)
            .subscribe((drug) => {
                const prePacks = drug.packs.filter((value, index) => drug.packs.indexOf(value) === index);
                this.packs = Array.from(new Set(prePacks.map((item: any) => `${item.count}-${item.unit}`)));
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

    public submitInterviewForm(value) {
        console.log("submitInterviewForm value: ", value);
    }
}
