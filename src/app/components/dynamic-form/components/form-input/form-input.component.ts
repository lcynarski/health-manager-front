import { Component, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';

@Component({
  selector: 'form-input',
  styleUrls: ['form-input.component.scss'],
  template: `
    <mat-form-field class="dynamic-field form-input" [formGroup]="group">
        <input matInput [attr.placeholder]="config.placeholder" [placeholder]="config.placeholder" [formControlName]="config.name">
    </mat-form-field>
  `
})
export class FormInputComponent implements Field {
  config: FieldConfig;
  group: FormGroup;
}
// <mat-form-field class="example-full-width" [formGroup]="group">
// <input matInput [attr.placeholder]="config.placeholder" [formControlName]="config.name"
//     [matDatepicker]="pickerStart" [placeholder]="config.placeholder">
//     <mat-datepicker-toggle matSuffix [for]="pickerStart"></mat-datepicker-toggle>
//     <mat-datepicker #pickerStart></mat-datepicker>
// </mat-form-field>
//
// <div
// class="dynamic-field form-input"
//     [formGroup]="group">
// <mdl-icon *ngIf="config.placeholder === 'date'">event</mdl-icon>
//     <mdl-textfield label={{config.label}} [attr.placeholder]="config.placeholder" [formControlName]="config.name" floating-label></mdl-textfield>
//
// </div>