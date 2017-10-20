import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { PatientService } from '../../_services/patient.service';

import { FieldConfig } from '../../components/dynamic-form/models/field-config.interface';
import { DynamicFormComponent } from '../../components/dynamic-form/containers/dynamic-form/dynamic-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Http } from '@angular/http';
import createPatientConfig from '../../_forms-configs/create-patient.config';

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
                private patientService: PatientService) {
        this.router = router;
    }

    public config = createPatientConfig;

    ngAfterViewInit() {
        let previousValid = this.form.valid;
        this.form.changes.subscribe(() => {
            if (this.form.valid !== previousValid) {
                previousValid = this.form.valid;
                this.form.setDisabled('submit', false);
            }
        });
        this.form.setDisabled('submit', false);
    }

    submit(value) {
        console.log(value);
        const { email, ...personalDetails } = value;
        // const personalDetails = { account : { personalDetails : { ...value }}};
        const registerData = {
            email,
            personalDetails,
            insuranceNumber: '222121212',
            role: 'ROLE_PATIENT'
        };
        this.patientService.savePatient(registerData)
            .subscribe((data) => {
                console.log(data);
                this.router.navigate(['/dashboard']);
            });
    }
}
