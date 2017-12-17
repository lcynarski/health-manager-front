import { Component, OnInit } from '@angular/core';
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
                <mat-option *ngFor="let option of options" [value]="option">
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
        this.translate.get(this.config.name)
            .subscribe((response) => this.name = response);
        this.translate.get(this.config.placeholder)
            .subscribe((response) => this.placeholder = response);
        this.config.options.forEach((option) => {
            this.translate.get(option)
                .subscribe((response) => this.options.push(response));
        })
    }
}
