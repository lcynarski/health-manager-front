import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';
import { DynamicFormComponent } from '../../containers/dynamic-form/dynamic-form.component';

@Component({
    selector: 'form-date',
    styleUrls: ['form-date.component.scss'],
    template: `
        <mat-form-field class="example-full-width" [formGroup]="group">
            <input matInput [attr.placeholder]="config.placeholder" [formControlName]="config.name"
                   [matDatepicker]="pickerStart" [placeholder]="config.placeholder">
            <mat-datepicker-toggle matSuffix [for]="pickerStart"></mat-datepicker-toggle>
            <mat-datepicker #pickerStart></mat-datepicker>
        </mat-form-field>
    `
})

export class FormDateComponent implements Field {

    config: FieldConfig;
    group: FormGroup;
    form: DynamicFormComponent;
}
