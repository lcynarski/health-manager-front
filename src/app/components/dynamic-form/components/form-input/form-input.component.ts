import { Component, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';

@Component({
  selector: 'form-input',
  styleUrls: ['form-input.component.scss'],
  template: `
    <div
      class="dynamic-field form-input"
      [formGroup]="group">
        <mdl-icon *ngIf="config.placeholder === 'date'">event</mdl-icon>
        <mdl-textfield label={{config.label}} [attr.placeholder]="config.placeholder" [formControlName]="config.name" floating-label></mdl-textfield>
    </div>
  `
})
export class FormInputComponent implements Field {
  config: FieldConfig;
  group: FormGroup;
}
