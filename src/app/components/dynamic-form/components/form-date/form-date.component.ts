import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import { FormGroup } from '@angular/forms';
import jQuery from 'jquery';
import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';
import {MdlDatePickerService} from '@angular-mdl/datepicker';
import moment = require('moment');
import {DynamicFormComponent} from "../../containers/dynamic-form/dynamic-form.component";

@Component({
  selector: 'form-date',
  styleUrls: ['form-date.component.scss'],
  template: `
      <div
        class="dynamic-field form-input"
        [formGroup]="group">
      <button
              mdl-button
              (click)="pickADate($event)"
              mdl-button-type="icon"
              mdl-ripple>
          <mdl-icon>event</mdl-icon>
      </button>
          <mdl-textfield [formControlName]="config.name" [value]="selectedDate?.format('MM-DD-YYYY')"></mdl-textfield>
      </div>
        <dialog-outlet></dialog-outlet>
  `
})

export class FormDateComponent implements Field {

  config: FieldConfig;
  group: FormGroup;
  form: DynamicFormComponent;

    public selectedDate: any;

    constructor(private datePicker: MdlDatePickerService) {}

    public pickADate($event: MouseEvent) {
        this.datePicker.selectDate(this.selectedDate, {openFrom: $event}).subscribe( (selectedDate: Date) => {
            this.selectedDate = selectedDate ? moment(selectedDate) : null;
        });
    }
}
