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
import { standardExaminationConfig } from '../../_forms-configs';
import { FormsService } from '../../_services/forms.service';
import { FieldConfig } from '../../components/dynamic-form/models/field-config.interface';
import { MedicalCheckupService } from '../../_services/medical-checkup.service';

@Component({
    providers: [PatientService, DrugsService, FormsService, MedicalCheckupService],
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
    formSelectState = {};
    packSelectState = {}

    myControl: FormControl = new FormControl();

    options = [];
    formsToChoose = [];

    filteredOptions: Observable<string[]>;

    formConfig: FieldConfig[];
    uploadedFormFields = [];
    formId: number;

    prescribedDrugsList = [];
    currentChosenPack = "";
    currentChosenDrugName = "";
    notesModel = "";

    constructor(private router: Router,
                private patientService: PatientService,
                private _formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private drugsService: DrugsService,
                private formService: FormsService,
                private medicalCheckupService: MedicalCheckupService) {
    }

    public tabChanged({ index }) {
        this.activeIndex = index;
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            // let userId = params['userId'];
            console.log(params);
            const type = params['type'];
            const id = params['id'];
            console.log('whats goin on: ', type, id);
        });

        this.formService.getAllForms()
            .subscribe((forms) => {
                this.formsToChoose = forms;
                console.log(this.formsToChoose);
            });

        this.formConfig = [];


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

    public getDrugsByName() {
        this.drugsService.getDrugsByName(this.myControl.value)
            .subscribe((drugs) => {
                this.drugs = drugs;
            });
    }

    public getPacks() {
        const chosenDrug = this.drugs.filter((drug) => drug.name === this.myControl.value)[0];
        this.currentChosenDrugName = chosenDrug.name;
        this.drugsService.getDrugDetails(chosenDrug.id)
            .subscribe((drug) => {
                const prePacks = drug.packs.filter((value, index) => drug.packs.indexOf(value) === index);
                this.packs = Array.from(new Set(prePacks.map((item: any) => `${item.count}-${item.unit}`)));
            });
    }

    public onChoosePack(pack) {
        this.currentChosenPack = pack;
    }

    public addDrugToList() {
        const drugToBePrescribed = {
            name: this.currentChosenDrugName,
            pack: this.currentChosenPack
        };
        this.prescribedDrugsList.push(drugToBePrescribed);
    }

    public onChooseForm(form) {
        console.log('this.formSelectState: ', form);
        this.formId = form.id;
        this.uploadedFormFields = form.formFields;
        this.formConfig = [];
        [...form.formFields].map(({ label, name, placeholder, type }) => {
            const fieldConfig = {
                type: type.toLowerCase(),
                label,
                name,
                placeholder
            };
            this.formConfig.push(fieldConfig);
        });
        const submitField = {
            label: 'Submit',
            name: 'submit',
            type: 'button'
        };
        this.formConfig.push(submitField);
    }

    public submitPreparedForm(data) {
        console.log('submitPreparedForm value: ', data);
        const medicalCheckupValues = [];
        this.uploadedFormFields.map(({ id, name }) => {
            debugger
            Object.keys(data).forEach((key) => {
                if (key === name) {
                    medicalCheckupValues.push(
                        {
                            value: data[key],
                            formFieldId: id
                        }
                    );
                }
            });
        });
        const medicalCheckupToSave = {
            formId: this.formId,
            medicalCheckupValues
        };
        console.log('medicalCheckupToSave: ', medicalCheckupToSave);
        this.medicalCheckupService.saveMedicalCheckup(this.patient.id, medicalCheckupToSave)
            .subscribe((response) => {
                console.log('saveMedicalCheckup response:', response);
            });
    }

    public onNotesChange() {
        console.log("this.notesmodel: ", this.notesModel);
    }

    public onSubmit(value) {
        console.log(this.form.value.pesel);
        this.getPatientByPesel(this.form.value.pesel);
    }

    public submitInterviewForm(value) {
        console.log('submitInterviewForm value: ', value);
    }

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
}
