import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';

@Component({
  selector: 'form-select',
  styleUrls: ['form-select.component.scss'],
  template: `
    <mat-form-field class="dynamic-field form-select" [formGroup]="group">
        <mat-select placeholder="config.placeholder" [attr.placeholder]="config.placeholder" [formControlName]="config.name">
            <mat-option *ngFor="let option of config.options" [value]="option">
                {{ option }}
            </mat-option>
        </mat-select>
    </mat-form-field>
  `
})
export class FormSelectComponent implements Field {
  config: FieldConfig;
  group: FormGroup;
}

/*


    <form class='select'
      [formGroup]="group">
      <mdl-select [formControlName]="config.name" label="{{config.label}}" floating-label>
        <mdl-option *ngFor="let option of config.options" [value]="option">
          {{ option }}
        </mdl-option>
      </mdl-select>
    </form>

    <mat-form-field class="example-full-width" [formGroup]="group">
        <input matInput [attr.placeholder]="config.placeholder" [formControlName]="config.name"
               [matDatepicker]="pickerStart" [placeholder]="config.placeholder">
        <mat-datepicker-toggle matSuffix [for]="pickerStart"></mat-datepicker-toggle>
        <mat-datepicker #pickerStart></mat-datepicker>
    </mat-form-field>

 */
