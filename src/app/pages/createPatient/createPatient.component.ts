import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { PatientService } from '../../_services/patient.service';

import { FieldConfig } from '../../components/dynamic-form/models/field-config.interface';
import { DynamicFormComponent } from '../../components/dynamic-form/containers/dynamic-form/dynamic-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Http } from '@angular/http';
import createPatientConfig from '../../_forms-configs/create-patient.config';
import moment = require('moment');
import { MatSnackBar } from '@angular/material';

@Component({
    providers: [PatientService],
    selector: 'create-patient',
    styleUrls: ['createPatient.component.scss'],
    templateUrl: './createPatient.component.html'
})
export class CreatePatientComponent implements AfterViewInit {
    @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
    private router: Router;

    constructor(router: Router,
                private http: Http,
                private route: ActivatedRoute,
                private patientService: PatientService,
                public snackBar: MatSnackBar) {
        this.router = router;
    }

    public config = createPatientConfig;

    ngAfterViewInit() {
        let previousValid = this.form.valid;
        this.form.changes.subscribe(() => {
            if (this.form.valid !== previousValid) {
                previousValid = this.form.valid;
                this.form.setDisabled('submit', !previousValid);
            }
        });
        this.form.setDisabled('submit', true);
    }

    submit(value) {
        console.log(value);
        const { email, birthdate, ...personalDetails } = value;
        const formatedDate = moment(birthdate).format('YYYY-MM-DD');
        const preparedPersonalDetails = { ...personalDetails, birthdate: formatedDate };
        const registerData = {
            email,
            personalDetails: preparedPersonalDetails,
            insuranceNumber: '222121212',
            role: 'ROLE_PATIENT'
        };
        this.patientService.savePatient(registerData)
            .subscribe((data) => {
                    console.log(data);
                    this.router.navigate(['/dashboard']);
                },
                () => {
                    this.snackBar.open('Something went wrong :(', undefined, {
                        duration: 4000,
                        extraClasses: ['error-snackbar'],
                        verticalPosition: 'top'
                    });
                });
    }
}
