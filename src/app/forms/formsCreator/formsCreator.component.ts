import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { FormsService } from '../../_services/forms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Http } from '@angular/http';
import { FieldsCreatorComponent } from '../fieldCreator/fieldCreator.component';
import { Form } from '../../_models/form';
import { FormCreatorStore } from '../../stores/formCreatorStore';
import { FieldCreatorStore } from '../../stores/fieldCreatorStore';
import { FieldConfig } from '../../components/dynamic-form/models/field-config.interface';
import { MatSnackBar } from '@angular/material';

@Component({
    providers: [FormsService, FormCreatorStore, FieldCreatorStore],
    selector: 'form-creator',
    styleUrls: ['formsCreator.component.scss'],
    templateUrl: './formsCreator.component.html'
})

export class FormsCreatorComponent implements OnInit {

    private formId: number;
    private router: Router;
    private form: Form;
    private fields: FieldsCreatorComponent[];
    private defaultFormId;
    private defaultDataSetName: string;
    formName: string;
    formsToChoose = [];
    formConfig: FieldConfig[];
    uploadedFormFields = [];

    constructor(router: Router,
                private http: Http,
                private route: ActivatedRoute,
                private formsService: FormsService,
                private formCreatorStore: FormCreatorStore,
                public snackBar: MatSnackBar) {}

    public ngOnInit() {
        this.formCreatorStore.formFields.subscribe((data) => {
            this.fields = data;
            console.log('fields: ', this.fields);
        });
        console.log(this.route.params);
        this.route.params.subscribe((params) => {
            if (params['formId']) {
                this.loadForm(params['formId']);
            }
        });
        this.formsService.getAllForms()
            .subscribe((forms) => {
                this.formsToChoose = forms;
            });
        this.formConfig = [];
        this.defaultDataSetName = '';
    }

    public onChooseForm(form) {
        this.defaultFormId = form.id;
        this.uploadedFormFields = form.formFields;
        this.formConfig = [];
        console.log('FOOORM: ', form);
        [...form.formFields].map(({ label, name, placeholder, type }) => {
            const fieldConfig = {
                type: type.toLowerCase(),
                label,
                name,
                placeholder
            };
            this.formConfig.push(fieldConfig);
        });
        const submitField = {
            label: 'Submit',
            name: 'submit',
            type: 'button'
        };
        this.formConfig.push(submitField);
    }

    public submitDefaultValues(data) {
        const defaultValues = [];
        for (const fieldName in data) {
            if (data.hasOwnProperty(fieldName)) {
                const valueItem = {
                    name: fieldName,
                    value: data[fieldName]
                };
                if (data[fieldName]) {
                    defaultValues.push(valueItem);
                }
            }
        }
        const defaultValuesSet = {
            name: this.defaultDataSetName,
            formId: this.defaultFormId,
            defaultValues
        };
        this.formsService.saveDefaultValues(this.defaultFormId, defaultValuesSet)
            .subscribe(
                (resp) => {
                    this.snackBar.open('Default values successfully saved', undefined, {
                        duration: 4000,
                        extraClasses: ['success-snackbar'],
                        verticalPosition: 'top'
                    });
            },
                (error) => {
                    this.snackBar.open('Something went wrong :(', undefined, {
                        duration: 4000,
                        extraClasses: ['error-snackbar'],
                        verticalPosition: 'top'
                    });
                }
            );
    }

    save(value) {
        this.fields.forEach((field) => {
            if (field['placeholder'] === 'date') {
                field['type'] = 'DATE';
            }
            field['type'] = field['type'].toUpperCase();
        });
        const form = {
            name: this.formName,
            formFields: [...this.fields],
            ownerId: 1
        };
        this.formsService.saveForm(form)
            .subscribe(
                () => {
                    this.formsService.getAllForms()
                        .subscribe((forms) => {
                            this.formsToChoose = forms;
                        });
                    this.snackBar.open('Form successfully saved', undefined, {
                        duration: 4000,
                        extraClasses: ['success-snackbar'],
                        verticalPosition: 'top'
                    });
                },
                () => {
                    this.snackBar.open('Something went wrong :(', undefined, {
                        duration: 4000,
                        extraClasses: ['error-snackbar'],
                        verticalPosition: 'top'
                    });
                }
            );;
    }

    loadForm(id: number) {
        this.formsService.getFormById(id)
            .subscribe((form) => {
                form.formFields.forEach((f) => {
                    this.formCreatorStore.addExistingField(f);
                });
            });
    }
}
