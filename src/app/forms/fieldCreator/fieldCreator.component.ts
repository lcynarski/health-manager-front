import { Component, ViewChild, Input, OnInit, ElementRef } from '@angular/core';
import { FormField } from '../../_models/form';
import { FieldConfig } from '../../components/dynamic-form/models/field-config.interface';
import { DynamicFormComponent } from '../../components/dynamic-form/containers/dynamic-form/dynamic-form.component';
import { FormCreatorStore } from '../../stores/formCreatorStore';
import { FormControl, FormGroup } from '@angular/forms';
import { FieldCreatorStore } from '../../stores/fieldCreatorStore';
import { MdlDialogComponent } from '@angular-mdl/core';

@Component({
    selector: 'field-creator',
    styleUrls: ['fieldCreator.component.scss'],
    templateUrl: './fieldCreator.component.html'
})

export class FieldsCreatorComponent implements OnInit {
    @ViewChild('form') form: DynamicFormComponent;
    @ViewChild('checkboxForm') checkboxForm: DynamicFormComponent;
    @ViewChild('dateForm') dateForm: DynamicFormComponent;
    @ViewChild('selectForm') selectForm: DynamicFormComponent;
    @Input('addFieldDialog') addFieldDialog: MdlDialogComponent;


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
            name: 'field-placeholder',
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

    constructor(private formCreatorStore: FormCreatorStore, private fieldCreatorStore: FieldCreatorStore, elementRef:ElementRef) {
        this.type = '';
        console.log(elementRef.nativeElement.parentElement)
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
        console.log('saveDate', value);
        const field = {
            type: 'input',
            label: value['date'],
            name: value['date'],
            placeholder: 'date',
        };
        this.formCreatorStore.saveNewOptionField(field);
        this.addFieldDialog.close()
        console.log(this.dateForm);
    }

    saveCheckboxField(value) {
        const field = {
            type: 'checkbox',
            label: value['checkbox'],
            name: value['checkbox'],
            placeholder: true,
        };
        this.formCreatorStore.saveNewOptionField(field);
        this.addFieldDialog.close();
    }

    saveOptionField(value) {
        const onlyOptions = [];
        this.options.forEach(o => {
            onlyOptions.push(o['option']);
        });
        const field = {
            type: 'select',
            label: this.selectFieldName,
            name: this.selectFieldName,
            options: onlyOptions,
            placeholder: 'option'
        };
        this.formCreatorStore.saveNewOptionField(field);
        this.addFieldDialog.close();
    }

    submitTextfield(value) {
        console.log('FORM VALUE', value);
        this.formCreatorStore.saveNewField(value);
        this.addFieldDialog.close();
    }

}
