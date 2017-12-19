import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { DynamicFormComponent } from '../../components/dynamic-form/containers/dynamic-form/dynamic-form.component';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

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
    @ViewChild('preparedForm') preparedForm: DynamicFormComponent;
    @ViewChild('diseaseInput') diseaseInput: ElementRef;
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

    private labels = {
        disease: 'disease',
        selectForm: 'select form',
        selectValues: 'select values',
        drug: 'drug',
        selectSize: 'select size',
        notes: 'notes',
    };


    formSelectState = {};
    packSelectState = {};
    defaulValuesSelectState = {};

    myControl: FormControl = new FormControl();

    options = [];
    formsToChoose = [];

    filteredOptions: Observable<string[]>;

    formConfig: FieldConfig[];
    uploadedFormFields = [];
    formId: number;

    prescribedDrugsList = [];
    currentChosenPack = '';
    currentChosenDrugName = '';
    notesModel = '';
    appointment = {
        id: '',
        patientId: ''
    };
    doctor = {};
    formDefaultValues = [];
    resultPresciption = [];
    resultDisease = '';
    diseaseModel = '';

    constructor(private router: Router,
                private patientService: PatientService,
                private _formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private drugsService: DrugsService,
                private formService: FormsService,
                private medicalCheckupService: MedicalCheckupService,
                private appointmentService: AppointmentService,
                private doctorService: DoctorService,
                private prescriptionService: PrescriptionsService,
                private translate: TranslateService,
                public snackBar: MatSnackBar) {
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

        this.translate.get('Disease')
            .subscribe((res) => this.labels.disease = res);
        this.translate.get('SelectForm')
            .subscribe((res) => this.labels.selectForm = res);
        this.translate.get('SelectValues')
            .subscribe((res) => this.labels.selectValues = res);
        this.translate.get('Drug')
            .subscribe((res) => this.labels.drug = res);
        this.translate.get('SelectSize')
            .subscribe((res) => this.labels.selectSize = res);
        this.translate.get('Notes')
            .subscribe((res) => this.labels.notes = res);
    }

    filter(val: string): string[] {
        val.length === 2 && this.drugsService.getDrugsByName(this.myControl.value)
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
        [...form.formFields].map(({ label, name, placeholder, type, options = null }) => {
            const fieldConfig = {
                type: type.toLowerCase(),
                label,
                name,
                placeholder,
                options
            };
            this.formConfig.push(fieldConfig);
        });
        const submitField = {
            label: 'Submit',
            name: 'submit',
            type: 'button'
        };
        this.formConfig.push(submitField);
        this.loadDefaultValues(form.id);
    }

    public onChooseDefaultData(data) {
        data.defaultValues && data.defaultValues.map(({ name, value }) => {
            this.preparedForm.setValue(name, value);
        });
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
                    diseaseName: this.diseaseInput.nativeElement.value
                };
                this.patientService.addToMedicalHistory(this.patient.id, toSaveInMedicalHistory)
                    .subscribe((resp) => {
                            console.log(resp);
                            this.snackBar.open(`Success added to medical history`, undefined, {
                                duration: 4000,
                                extraClasses: ['success-snackbar'],
                                verticalPosition: 'top'
                            });
                        },
                        (error) => {
                            this.snackBar.open(`Cannot add to medical history: ${error}`, undefined, {
                                duration: 4000,
                                extraClasses: ['error-snackbar'],
                                verticalPosition: 'top'
                            });
                        })
                console.log('saveMedicalCheckup response:', response, toSaveInMedicalHistory);
            },
                (error) => {
                    this.snackBar.open(`Cannot save medical checkup: ${error}`, undefined, {
                        duration: 4000,
                        extraClasses: ['error-snackbar'],
                        verticalPosition: 'top'
                    });
            });
        this.resultDisease = this.diseaseInput.nativeElement.value;
    }

    public onNotesChange() {
        console.log('this.notesmodel: ', this.notesModel);
    }

    public onSubmit(value) {
        console.log(this.form.value.pesel);
        this.getPatientByPesel(this.form.value.pesel);
    }

    public submitInterviewForm(value) {
        console.log('submitInterviewForm value: ', value);
        const today = new Date();
        const toSaveInMedicalHistory = {
            diseaseName: this.diseaseInput.nativeElement.value,
            symptoms: value.symptoms
        };
        this.patientService.addToMedicalHistory(this.patient.id, toSaveInMedicalHistory)
            .subscribe((resp) => {
                    console.log(resp);
                    this.snackBar.open(`Success added to medical history`, undefined, {
                        duration: 4000,
                        extraClasses: ['success-snackbar'],
                        verticalPosition: 'top'
                    });
                },
                (error) => {
                    this.snackBar.open(`Cannot add to medical history: ${error}`, undefined, {
                        duration: 4000,
                        extraClasses: ['error-snackbar'],
                        verticalPosition: 'top'
                    });
                }
            );
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
                this.resultPresciption = response.drugs;
            });
    }

    private loadDefaultValues(formId) {
        this.formService.getDefaultValues(formId)
            .subscribe((defaults) => {
                this.formDefaultValues = defaults;
            });
    }

    private getPatientByPesel(pesel) {
        this.patientService.getPatientByPesel(pesel)
            .subscribe((patients) => {
                this.patient = patients;
            });
    }
}
