import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { PatientService } from '../../_services/patient.service';
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
    public config = createPatientConfig;
    private router: Router;

    constructor(router: Router,
                private http: Http,
                private route: ActivatedRoute,
                private patientService: PatientService,
                public snackBar: MatSnackBar) {
        this.router = router;
    }

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
            role: 'ROLE_PATIENT'
        };
        this.patientService.savePatient(registerData)
            .subscribe(
                (result) => {
                    console.log(result);
                    this.router.navigate(['/dashboard']);
                },
                (error) => {
                    this.snackBar.open(`Cannot create patient: ${error}`, undefined, {
                        duration: 4000,
                        extraClasses: ['error-snackbar'],
                        verticalPosition: 'top'
                    });
                });
    }
}
