import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Validators } from '@angular/forms';
import {PatientService} from '../../_services/patient.service';

import { FieldConfig } from '../../components/dynamic-form/models/field-config.interface';
import { DynamicFormComponent } from '../../components/dynamic-form/containers/dynamic-form/dynamic-form.component';
import {ActivatedRoute, Router} from '@angular/router';
import {Http} from '@angular/http';

@Component({
    providers: [PatientService],
    selector: 'create-patient',
    styleUrls: ['createPatient.component.scss'],
    templateUrl: './createPatient.component.html'
})
export class CreatePatientComponent implements AfterViewInit {
    @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
    private router: Router;

    constructor(
        router: Router,
        private http: Http,
        private route: ActivatedRoute,
        private patientService: PatientService) {
        this.router = router;
    }

    config: FieldConfig[] = [
        {
            type: 'input',
            label: 'First Name',
            name: 'firstName',
            placeholder: 'First Name',
            validation: [Validators.required]
        },
        {
            type: 'input',
            label: 'Last Name',
            name: 'lastName',
            placeholder: 'Last Name',
            validation: [Validators.required]
        },
        {
            type: 'date',
            label: 'Date of birth',
            name: 'birthdate',
            placeholder: 'Date',
            validation: [Validators.required]
        },
        {
            type: 'input',
            label: 'PESEL',
            name: 'pesel',
            placeholder: 'PESEL',
            validation: [Validators.required, Validators.pattern('[0-9][0-9][0-1][0-9][0-3][0-9][0-9][0-9][0-9][0-9][0-9]')]
        },
        {
            type: 'select',
            label: 'Gender',
            name: 'gender',
            options: ['Male', 'Female', 'Other'],
            placeholder: 'Select an option'
        },
        {
            type: 'input',
            label: 'Phone Number',
            name: 'phoneNumber',
            placeholder: 'Phone Number',
            validation: [Validators.required, Validators.pattern('[0-9]+')]
        },
        {
            type: 'input',
            label: 'Country',
            name: 'country',
            placeholder: 'Country',
            validation: [Validators.required]
        },
        {
            type: 'input',
            label: 'City',
            name: 'city',
            placeholder: 'City',
            validation: [Validators.required]
        },
        {
            type: 'input',
            label: 'Street',
            name: 'street',
            placeholder: 'Street',
            validation: [Validators.required]
        },
        {
            type: 'input',
            label: 'Building',
            name: 'buildingNumber',
            placeholder: 'Building number',
            validation: [Validators.required]
        },
        {
            type: 'input',
            label: 'Flat',
            name: 'flatNumber',
            placeholder: 'Flat number'
        },
        {
            label: 'Submit',
            name: 'submit',
            type: 'button'
        }
    ];

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
        console.log(value)
        const personalDetails = { account : { personalDetails : { ...value }}};
        this.patientService.savePatient(personalDetails)
            .subscribe((data) => {
                console.log(data);
                this.router.navigate(['/dashboard']);
        });
    }
}
