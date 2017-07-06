import { Component, ViewChild, AfterViewInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'create-patient',
    styleUrls: ['./patientSearch.component.scss'],
    templateUrl: `./patientSearch.component.html`
})

export class PatientSearchComponent {

    public disableForm = false;
    public form: FormGroup;
    public pesel = new FormControl('', Validators.required);
    public lastName = new FormControl('');

    constructor(private fb: FormBuilder) {
        this.form = fb.group({
            pesel: this.pesel,
            lastName: this.lastName
        });
    }

    public onSubmit() {
        console.log(this.form);
    }

    public onDisableForm(formDisabled: boolean) {
        if ( formDisabled ) {
            this.form.disable();
        } else {
            this.form.enable();
        }
    }

}

