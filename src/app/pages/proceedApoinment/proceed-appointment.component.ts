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
import { AppointmentService } from '../../_services/appointment.service';
import { TimeSlotService } from '../../_services/timeSlot.service';
import { DoctorService } from '../../_services/doctor.service';
import { subscribeOn } from 'rxjs/operator/subscribeOn';
import { PrescriptionsService } from '../../_services/prescriptions.service';

@Component({
    providers: [
        PatientService,
        DrugsService,
        FormsService,
        MedicalCheckupService,
        AppointmentService,
        TimeSlotService,
        DoctorService,
        PrescriptionsService
    ],
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
    appointment = {
        id: '',
        patientId: ''
    };
    doctor = {};

    constructor(private router: Router,
                private patientService: PatientService,
                private _formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private drugsService: DrugsService,
                private formService: FormsService,
                private medicalCheckupService: MedicalCheckupService,
                private appointmentService: AppointmentService,
                private doctorService: DoctorService,
                private prescriptionService: PrescriptionsService) {
    }

    public tabChanged({ index }) {
        this.activeIndex = index;
    }

    ngOnInit() {
        this.route
            .params.subscribe((params: Params) => {
            const appointmentId = params['appointmentId'];
            this.appointmentService.getAppointmentById(appointmentId)
                .subscribe((response) => {
                    this.appointment = response;
                    if (this.appointment && this.appointment.id) {
                        this.patientService.getById(this.appointment.patientId)
                            .subscribe((patient) => {
                                this.patient = patient;
                            });
                    }
                });
        });
        this.route
            .queryParams
            .subscribe((params) => {
                const doctorId = params['doctor'] || '';
                this.doctorService.getById(doctorId)
                    .subscribe((response) => {
                        this.doctor = response;
                    });
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
            drugName: this.currentChosenDrugName,
            size: this.currentChosenPack
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
        this.medicalCheckupService.saveMedicalCheckup(medicalCheckupToSave)
            .subscribe((response) => {
                const today = new Date();
                const toSaveInMedicalHistory = {
                    medicalCheckupId: response.id,
                    detectionDate: today.getDate(),
                    diseaseName: 'ptasia grypa'
                }
                this.patientService.addToMedicalHistory(this.patient.id, toSaveInMedicalHistory)
                    .subscribe((resp) => {
                        console.log(resp);
                    })
                console.log('saveMedicalCheckup response:', response, toSaveInMedicalHistory);
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

    public submitPrescription() {
        const prescriptionToSave = {
            notes: this.notesModel,
            appointmentId: this.appointment.id,
            drugs: this.prescribedDrugsList
        };
        this.prescriptionService.savePrescription(prescriptionToSave)
            .subscribe((response) => {
                console.log('savePrescription response: ', response);
            });
    }

    private getPatientByPesel(pesel) {
        this.patientService.getPatientByPesel(pesel)
            .subscribe((patients) => {
                this.patient = patients;
            });
    }
}
