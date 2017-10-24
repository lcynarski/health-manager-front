import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import jQuery from 'jquery';
import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';
import { MdlDatePickerService } from '@angular-mdl/datepicker';
import moment = require('moment');
import { DynamicFormComponent } from '../../containers/dynamic-form/dynamic-form.component';

@Component({
    selector: 'form-date',
    styleUrls: ['form-date.component.scss'],
    template: `
        <mat-form-field class="example-full-width" [formGroup]="group">
            <input matInput [attr.placeholder]="config.placeholder" [formControlName]="config.name"
                   [matDatepicker]="pickerStart" placeholder="config.placeholder">
            <mat-datepicker-toggle matSuffix [for]="pickerStart"></mat-datepicker-toggle>
            <mat-datepicker #pickerStart></mat-datepicker>
        </mat-form-field>
    `
})

export class FormDateComponent implements Field {

    config: FieldConfig;
    group: FormGroup;
    form: DynamicFormComponent;

    public selectedDate: any;

    constructor(private datePicker: MdlDatePickerService) {
    }

    public pickADate($event: MouseEvent) {
        this.datePicker.selectDate(this.selectedDate, { openFrom: $event }).subscribe((selectedDate: Date) => {
            this.selectedDate = selectedDate ? moment(selectedDate) : null;
        });
    }
}
