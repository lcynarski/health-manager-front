import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Validators } from '@angular/forms';

import { FieldConfig } from '../../components/dynamic-form/models/field-config.interface';
import { DynamicFormComponent } from '../../components/dynamic-form/containers/dynamic-form/dynamic-form.component';

@Component({
    selector: 'create-patient',
    styleUrls: ['createPatient.component.scss'],
    template: `
        <div class="app">
            <dynamic-form
                    [config]="config"
                    #form="dynamicForm"
                    (submit)="submit($event)">
            </dynamic-form>
            {{ form.valid }}
            {{ form.value | json }}
        </div>
    `
})
export class CreatePatientComponent implements AfterViewInit {
    @ViewChild(DynamicFormComponent) form: DynamicFormComponent;

    config: FieldConfig[] = [
        {
            type: 'input',
            label: 'First Name',
            name: 'name',
            placeholder: 'First Name',
            validation: [Validators.required, Validators.minLength(4)]
        },
        {
            type: 'input',
            label: 'Last Name',
            name: 'name',
            placeholder: 'Last Name',
            validation: [Validators.required, Validators.minLength(4)]
        },
        {
            type: 'input',
            label: 'Date of birth',
            name: 'date',
            placeholder: 'Date',
            validation: [Validators.required, Validators.minLength(4)]
        },
        {
            type: 'input',
            label: 'PESEL',
            name: 'pesel',
            placeholder: 'PESEL',
            validation: [Validators.required, Validators.minLength(4)]
        },
        {
            type: 'select',
            label: 'Gender',
            name: 'food',
            options: ['Male', 'Female', 'Other'],
            placeholder: 'Select an option',
            validation: [Validators.required]
        },
        {
            type: 'input',
            label: 'Phone Number',
            name: 'phone',
            placeholder: 'Phone Number',
            validation: [Validators.required, Validators.minLength(4)]
        },
        {
            type: 'input',
            label: 'Country',
            name: 'country',
            placeholder: 'Country',
            validation: [Validators.required, Validators.minLength(4)]
        },
        {
            type: 'input',
            label: 'City',
            name: 'city',
            placeholder: 'City',
            validation: [Validators.required, Validators.minLength(4)]
        },
        {
            type: 'input',
            label: 'Street',
            name: 'street',
            placeholder: 'Street',
            validation: [Validators.required, Validators.minLength(4)]
        },
        {
            type: 'input',
            label: 'Building',
            name: 'building',
            placeholder: 'Building number',
            validation: [Validators.required, Validators.minLength(4)]
        },
        {
            type: 'input',
            label: 'Flat',
            name: 'flat',
            placeholder: 'Flat number',
            validation: [Validators.required, Validators.minLength(4)]
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

    submit(value: {[name: string]: any}) {
        console.log(value);
    }
}
