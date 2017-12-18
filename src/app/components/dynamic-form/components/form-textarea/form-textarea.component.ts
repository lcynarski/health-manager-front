import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'form-textarea',
    styleUrls: ['form-textarea.component.scss'],
    template: `
        <mat-form-field class="dynamic-field form-input" [formGroup]="group">
            <textarea matInput [placeholder]="placeholder" [formControlName]="config.name"></textarea>
        </mat-form-field>
    `
})

export class FormTextareaComponent implements Field, OnInit {
    config: FieldConfig;
    group: FormGroup;
    name: string;
    placeholder: string;

    constructor(private translate: TranslateService) {
    }

    ngOnInit(): void {
        this.config.name && this.translate.get(this.config.name)
            .subscribe((response) => this.name = response);
        this.config.placeholder && this.translate.get(this.config.placeholder)
            .subscribe((response) => this.placeholder = response);
    }
}
