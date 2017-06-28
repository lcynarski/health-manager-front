import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';

@Component({
  selector: 'form-select',
  styleUrls: ['form-select.component.scss'],
  template: `
    <div class='select'
      [formGroup]="group">
      <mdl-select [formControlName]="config.name" label="{{config.label}}">
        <mdl-option *ngFor="let option of config.options" [value]="option">
          {{ option }}
        </mdl-option>
      </mdl-select>
    </div>
  `
})
export class FormSelectComponent implements Field {
  config: FieldConfig;
  group: FormGroup;
}
