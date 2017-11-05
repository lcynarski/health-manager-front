import { Component, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';

@Component({
  selector: 'form-textarea',
  styleUrls: ['form-textarea.component.scss'],
  template: `
    <mat-form-field class="dynamic-field form-input" [formGroup]="group">
        <textarea matInput [placeholder]="config.placeholder" [formControlName]="config.name" ></textarea>
    </mat-form-field>
  `
})
export class FormTextareaComponent implements Field {
  config: FieldConfig;
  group: FormGroup;
}
