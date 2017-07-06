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
    <mdl-textfield label={{config.label}} floating-label></mdl-textfield>
  `
})
export class FormInputComponent implements Field {
  config: FieldConfig;
  group: FormGroup;
}