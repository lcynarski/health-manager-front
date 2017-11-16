import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DynamicFieldDirective } from './components/dynamic-field/dynamic-field.directive';
import { DynamicFormComponent } from './containers/dynamic-form/dynamic-form.component';
import { FormButtonComponent } from './components/form-button/form-button.component';
import { FormInputComponent } from './components/form-input/form-input.component';
import { FormSelectComponent } from './components/form-select/form-select.component';
import { MdlModule } from '@angular-mdl/core';
import { MdlSelectModule } from '@angular2-mdl-ext/select';
import { MdlPopoverModule } from '@angular2-mdl-ext/popover';
import { FormCheckboxComponent } from './components/form-checkbox/form-checkbox.component';
import { FormDateComponent } from './components/form-date/form-date.component';
import { MdlDatePickerModule } from '@angular-mdl/datepicker';
import {
    DateAdapter, MAT_DATE_FORMATS, MatDatepickerModule, MatFormFieldModule,
    MatInputModule, MatOptionModule, MatSelectModule
} from '@angular/material';
import { FormTextareaComponent } from './components/form-textarea/form-textarea.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MdlModule,
        MdlSelectModule,
        MdlPopoverModule,
        MdlDatePickerModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatOptionModule
    ],
    declarations: [
        DynamicFieldDirective,
        DynamicFormComponent,
        FormButtonComponent,
        FormInputComponent,
        FormSelectComponent,
        FormCheckboxComponent,
        FormDateComponent,
        FormTextareaComponent
    ],
    exports: [
        DynamicFormComponent
    ],
    entryComponents: [
        FormButtonComponent,
        FormInputComponent,
        FormSelectComponent,
        FormCheckboxComponent,
        FormDateComponent,
        FormTextareaComponent
    ]
})
export class DynamicFormModule {
}
