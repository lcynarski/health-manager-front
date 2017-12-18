import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'form-input',
    styleUrls: ['form-input.component.scss'],
    template: `
        <mat-form-field class="dynamic-field form-input" [formGroup]="group">
            <input matInput [attr.placeholder]="placeholder" [placeholder]="placeholder"
                   [formControlName]="config.name" [type]="type">
        </mat-form-field>
    `
})
export class FormInputComponent implements Field, OnInit {
    config: FieldConfig;
    group: FormGroup;
    name: string;
    placeholder: string;
    type: string;

    constructor(private translate: TranslateService) {
    }

    ngOnInit(): void {
        this.config.name && this.translate.get(this.config.name)
            .subscribe((response) => this.name = response);
        this.config.placeholder && this.translate.get(this.config.placeholder)
            .subscribe((response) => this.placeholder = response);
        this.type = this.config.name.includes('password' || 'email' || 'number' || 'url') ? this.config.name : 'text';
    }
}
