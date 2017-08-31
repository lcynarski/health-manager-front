import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';

@Component({
  selector: 'form-checkbox',
  styleUrls: ['form-checkbox.component.scss'],
  template: `
    <form class='checkbox'
      [formGroup]="group">
      <mdl-checkbox [formControlName]="config.name">
          {{config.label}}
      </mdl-checkbox>\
        
    </form>
  `
})

export class FormCheckboxComponent implements Field {
  config: FieldConfig;
  group: FormGroup;
}
