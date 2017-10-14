import { Component, ViewChild, AfterViewInit, Input, Inject } from '@angular/core';
import { FormsService } from '../../_services/forms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Http } from '@angular/http';
import { FormField } from '../../_models/form';
import { FieldConfig } from '../../components/dynamic-form/models/field-config.interface';
import { DynamicFormComponent } from '../../components/dynamic-form/containers/dynamic-form/dynamic-form.component';
import { FormCreatorStore } from '../../stores/formCreatorStore';

@Component({
    selector: 'fields-remover',
    styleUrls: ['fieldsRemover.component.scss'],
    templateUrl: './fieldsRemover.component.html'
})

export class FieldsRemoverComponent {
    @Input() fields: any;
    @ViewChild(DynamicFormComponent) form: DynamicFormComponent;

    public id: string;
    field: FormField;

    config: FieldConfig[] = [
        {
            type: 'input',
            label: 'Field name',
            name: 'field-name',
            placeholder: 'Provide field name'
        },
        {
            type: 'checkbox',
            label: 'Field required',
            name: 'field-required'
        },
        {
            type: 'input',
            label: 'Label',
            name: 'field-label',
            placeholder: 'Label'
        },
        {
            type: 'input',
            label: 'Placeholder',
            name: 'field-placeholderl',
            placeholder: 'Placeholder'
        },
        {
            type: 'input',
            label: 'Error text',
            name: 'field-error',
            placeholder: 'Error text'
        },
        {
            label: 'Submit',
            name: 'submit',
            type: 'button'
        }
    ];

    constructor(private formCreatorStore: FormCreatorStore) {
    }

    removeField(name) {
        console.log('FORM FIELD TO DELETE => ', name);
        this.formCreatorStore.deleteField(name);
    }

}
