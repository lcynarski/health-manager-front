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
