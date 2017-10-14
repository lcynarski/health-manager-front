import {Component, ViewChild, AfterViewInit, Input, Inject, OnInit} from '@angular/core';
import { FormsService } from '../../_services/forms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Http } from '@angular/http';
import {FormField} from '../../_models/form';
import {FieldConfig} from '../../components/dynamic-form/models/field-config.interface';
import {DynamicFormComponent} from '../../components/dynamic-form/containers/dynamic-form/dynamic-form.component';
import { FormCreatorStore } from '../../stores/formCreatorStore';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FieldCreatorStore} from '../../stores/fieldCreatorStore';
import {nodeValue} from "@angular/core/src/view";
import {getBindingElementVariableDeclaration} from "tslint";

@Component({
    selector: 'field-creator',
    styleUrls: ['fieldCreator.component.scss'],
    templateUrl: './fieldCreator.component.html'
})

export class FieldsCreatorComponent implements OnInit {
    @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
    @ViewChild('selectForm') selectForm: DynamicFormComponent;

    public id: string;
    field: FormField;
    formssss: FormGroup;
    type: string;
    private options: FieldsCreatorComponent[];
    selectFieldName: string;
    dateFieldName: string;
    checkboxName: string;

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

    optionConfig: FieldConfig[] = [
        {
            type: 'input',
            label: 'Option',
            name: 'option',
            placeholder: 'Option'
        },
        {
            label: 'Add',
            name: 'submit',
            type: 'button'
        }
    ];

    checkboxConfig: FieldConfig[] = [
        {
            type: 'input',
            label: 'Checkbox label',
            name: 'checkbox',
            placeholder: 'Checkbox label'
        },
        {
            label: 'Save',
            name: 'submit',
            type: 'button'
        }
    ];

    dateConfig: FieldConfig[] = [
        {
            type: 'input',
            label: 'Date label',
            name: 'date',
            placeholder: 'Date label'
        },
        {
            label: 'Save',
            name: 'submit',
            type: 'button'
        }
    ];

    constructor(private formCreatorStore: FormCreatorStore, private fieldCreatorStore: FieldCreatorStore) {
        this.type = '';
    }

    ngOnInit() {
        this.formssss = new FormGroup({
            fieldType: new FormControl()
        });
        this.fieldCreatorStore.selectOptions.subscribe((data) => this.options = data);
    }

    onChange(type) {
        console.log(type);
        this.type = type;
    }

    addOption(value) {
        console.log('ADD OPTION: ', value);
        this.fieldCreatorStore.saveNewOption(value);
    }

    removeOption(name) {
        console.log('FORM FIELD TO DELETE => ', name);
        this.fieldCreatorStore.deleteOption(name);
    }
    saveDateField(value) {
        console.log('saveDate', value)
        const field = {
            type: 'input',
            label: value['date'],
            name: value['date'],
            placeholder: 'date',
        };
        this.formCreatorStore.saveNewOptionField(field);
    }

    saveCheckboxField(value) {
        const field = {
            type: 'checkbox',
            label: value['checkbox'],
            name: value['checkbox'],
            placeholder: true,
        };
        this.formCreatorStore.saveNewOptionField(field);
    }

    saveOptionField(value) {
        const onlyOptions = [];
        this.options.forEach(o => {
            onlyOptions.push({value: o['option']});
        })
        const field = {
            type: 'select',
            label: this.selectFieldName,
            name: this.selectFieldName,
            options: onlyOptions,
            placeholder: 'option'
        };
        this.formCreatorStore.saveNewOptionField(field);
    }

    submit(value) {
        console.log('FORM VALUE', value);
        this.formCreatorStore.saveNewField(value);
    }

}
