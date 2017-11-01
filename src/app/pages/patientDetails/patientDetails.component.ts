import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Patient } from '../../_models/patient';
import { PatientService } from '../../_services/patient.service';
import { DynamicFormComponent } from '../../components/dynamic-form/containers/dynamic-form/dynamic-form.component';
import { FieldConfig } from '../../components/dynamic-form/models/field-config.interface';
import { createPatientConfig, medicalInfoConfig } from '../../_forms-configs';
import moment = require('moment');
import { isSuccess } from '@angular/http/src/http_utils';


@Component({
    providers: [PatientService],
    selector: 'patient-details',
    templateUrl: './patientDetails.component.html',
    styleUrls: ['./patientDetails.component.scss']
})

export class PatientDetailsComponent implements OnInit {
    @ViewChild('editPatientForm') editPatientForm: DynamicFormComponent;
    @ViewChild('medicalInfoEditForm') medicalInfoEditForm: DynamicFormComponent;
    // medicalInfoEditForm: DynamicFormComponent;
    @Input() patient: Patient;

    // public patient: Patient;
    public id: string;
    public lat: number = 51.678418;
    public lng: number = 7.809007;
    public editPatientConfig = createPatientConfig;
    public medicalInfoConfig = medicalInfoConfig;
    private router: Router;
    private sub: any;
    model: any = {};

    constructor(router: Router,
                private http: Http,
                private route: ActivatedRoute,
                private patientService: PatientService) {
        this.router = router;
    }

    public ngOnInit() {
        console.log(this.editPatientConfig);
        console.log(this.medicalInfoConfig);
        this.sub = this.route.params.subscribe((params) => {
            this.id = params['patientId']; // (+) converts string 'id' to a number
            this.loadPatientData();
            this.loadPatientMedicalData();
        });
    }

    public loadPatientData() {
        this.patientService.getById(this.id)
            .subscribe((patient) => {
                this.patient = patient;
                const { birthdate } = patient;
                const formattedDate = moment(birthdate).format('YYYY-MM-DD');
                this.patient = { ...this.patient, birthdate: formattedDate };
                this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${patient.city}`)
                    .map((res) => res.json())
                    .subscribe((response) => {
                        // this.lat = response['results'][0]['geometry']['location']['lat'];
                        // this.lng = response['results'][0]['geometry']['location']['lng'];
                    });
            });
        return this.patient;
    }

    public loadPatientMedicalData() {
        this.patientService.getMedicalInfo(this.id)
            .subscribe((medicalInfo) => {
                this.patient.medicalInfo = medicalInfo;
            });
    }

    submit(value) {
        const personalDetails = {
            id: this.patient.id,
            account: {
                id: this.patient.account.id,
                personalDetails: {
                    id: this.patient.account.personalDetails.id,
                    ...value
                }
            }
        };
        this.patientService.editPatient(personalDetails)
            .subscribe((data) => {
                console.log(data);
                this.router.navigate(['/patientDetails'],
                    { queryParams: { id: this.id } });
            });
    }

    addMedicalInfo(value) {
        console.log('medicalinfovalue', value);
        this.patientService.saveMedicalInfo(this.patient.id, value)
            .subscribe((data) => {
                console.log('saveMedicalInfo', data);
                this.loadPatientMedicalData();
            });
    }

    editMedicalInfo(value) {
        console.log('medicalinfovalue', value);
        this.patientService.updateMedicalInfo(this.patient.id, value)
            .subscribe((data) => {
                console.log('saveMedicalInfo', data);
                this.loadPatientMedicalData();
        });
    }

    showMedicalHistory() {
        console.log('Start date: ', this.model.startDate);
        console.log('End date: ', this.model.endDate);
        this.patientService.getMedicalHistory(this.patient.id, this.model.startDate, this.model.endDate)
            .subscribe((data) => {
                console.log('showMedicalHistory response: ', data);
            });
    }

    onDialogShow = (dialogRef) => {
        Object.keys(this.patient).forEach((key) => {
            if ((key !== 'id') && (key !== 'insuranceNumber') && (key !== 'medicalInfo') && this.editPatientForm) {
                 this.editPatientForm.setValue(key, this.patient[key]);
            }
        });
    }

    onMedicalInfoDialogShow = (dialogRef) => {
    }

    onMedicalInfoEditDialogShow = (dialogRef) => {
        Object.keys(this.patient.medicalInfo).forEach((key) => {
            if ((key !== 'id') && this.medicalInfoEditForm) {
                this.medicalInfoEditForm.setValue(key, this.patient.medicalInfo[key]);
            }
        });
    }
}
