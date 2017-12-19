import { Component, OnChanges, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'form-select',
    styleUrls: ['form-select.component.scss'],
    template: `
        <mat-form-field class="dynamic-field form-select" [formGroup]="group">
            <mat-select [placeholder]="placeholder" [attr.placeholder]="placeholder"
                        [formControlName]="config.name">
                <mat-option *ngFor="let option of config.options" [value]="option">
                    {{ option }}
                </mat-option>
            </mat-select>
        </mat-form-field>
    `
})
export class FormSelectComponent implements Field, OnInit {
    config: FieldConfig;
    group: FormGroup;
    name: string;
    placeholder: string;
    options = [];

    constructor(private translate: TranslateService) {
    }


    ngOnInit(): void {
        this.config.name && this.translate.get(this.config.name)
            .subscribe((response) => this.name = response);
        this.config.placeholder && this.translate.get(this.config.placeholder)
            .subscribe((response) => this.placeholder = response);
        if (this.config.options.length > 0) {
            const options = this.config.options;
            this.config.options = [];
            options.forEach((option) => {
                this.translate.get(option)
                    .subscribe((response) => this.config.options.push(response));
            });
        }
    }
}
