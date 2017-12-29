import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';
import { DynamicFormComponent } from '../../containers/dynamic-form/dynamic-form.component';
import { TranslateService } from '@ngx-translate/core';
import { DateAdapter } from '@angular/material';

@Component({
    selector: 'form-date',
    styleUrls: ['form-date.component.scss'],
    template: `
        <mat-form-field class="example-full-width" [formGroup]="group">
            <input matInput [attr.placeholder]="placeholder" [formControlName]="config.name"
                   [matDatepicker]="pickerStart" [placeholder]="placeholder">
            <mat-datepicker-toggle matSuffix [for]="pickerStart"></mat-datepicker-toggle>
            <mat-datepicker #pickerStart></mat-datepicker>
        </mat-form-field>
    `
})

export class FormDateComponent implements Field, OnInit {

    config: FieldConfig;
    group: FormGroup;
    form: DynamicFormComponent;
    name: string;
    placeholder: string;

    constructor(private translate: TranslateService,
                private adapter: DateAdapter<any>) {
    }


    ngOnInit(): void {
        this.config.name && this.translate.get(this.config.name)
            .subscribe((response) => this.name = response);
        this.config.placeholder && this.translate.get(this.config.placeholder)
            .subscribe((response) => this.placeholder = response);
        const currentLang = sessionStorage.getItem('currentLang');
        this.adapter.setLocale(currentLang || 'pl');
    }
}
