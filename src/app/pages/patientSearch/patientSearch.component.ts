import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientService } from '../../_services/patient.service';
import { Patient } from '../../_models/patient';

@Component({
    providers: [PatientService],
    selector: 'patient-pesel-search',
    styleUrls: ['./patientSearch.component.scss'],
    templateUrl: './patientSearch.component.html'
})

export class PatientSearchComponent implements OnInit {

    public disableForm = false;
    public form: FormGroup;
    public pesel = new FormControl('', Validators.required);
    // public lastName = new FormControl('');
    public patient: Patient;
    patients: Patient[] = [];

    constructor(private fb: FormBuilder, private patientService: PatientService) {
    }

    public ngOnInit() {
        this.form = this.fb.group({
            pesel: this.pesel
        });
        // this.form.valueChanges
        //     .map((formValues) => {
        //         formValues.pesel = formValues.pesel;
        //         return formValues;
        //     })
        //     // .filter((formValues) => this.form.valid)
        //     .subscribe((formValues) => {
        //         console.log(`Model Driven Form valid: ${this.form.valid} value:`, JSON.stringify(formValues));
        //     });
    }

    public onSubmit(value) {
        console.log(this.form.value.pesel);
        this.getPatientByPesel(this.form.value.pesel);
    }

    public onDisableForm(formDisabled: boolean) {
        if (formDisabled) {
            this.form.disable();
        } else {
            this.form.enable();
        }
    }

    private getPatientByPesel(pesel) {
        this.patientService.getPatientByPesel(pesel)
            .subscribe((patients) => {
                this.patient = patients;
            });
    }

}

