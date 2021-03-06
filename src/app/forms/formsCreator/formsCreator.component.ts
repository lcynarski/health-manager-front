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
import { DynamicFormComponent } from '../../components/dynamic-form/containers/dynamic-form/dynamic-form.component';
import { MdlDialogComponent } from '@angular-mdl/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    providers: [FormsService, FormCreatorStore, FieldCreatorStore],
    selector: 'form-creator',
    styleUrls: ['formsCreator.component.scss'],
    templateUrl: './formsCreator.component.html'
})

export class FormsCreatorComponent implements OnInit {
    @ViewChild('addFieldDialog') addFieldDialog: MdlDialogComponent;
    @ViewChild('removeFieldDialog') removeFieldDialog: MdlDialogComponent;
    @ViewChild('manageFormsDialog') manageFormsDialog: MdlDialogComponent;
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
    labels = {
        formName: '',
        selectForm: '',
        defaultDatasetName: '',
        formSaved: '',
        valuesSaved: '',
        sthWentWrong: ''
    }

    constructor(router: Router,
                private http: Http,
                private route: ActivatedRoute,
                private formsService: FormsService,
                private formCreatorStore: FormCreatorStore,
                private translate: TranslateService,
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
        this.translate.get('FormName')
            .subscribe((response) => this.labels.formName = response);
        this.translate.get('SelectForm')
            .subscribe((response) => this.labels.selectForm = response);
        this.translate.get('DefaultDatasetName')
            .subscribe((response) => this.labels.defaultDatasetName = response);
        this.translate.get('FormSuccSaved')
            .subscribe((response) => this.labels.formSaved = response);
        this.translate.get('DefValsSuccSaved')
            .subscribe((response) => this.labels.valuesSaved = response);
        this.translate.get('DefauSthWentWrongltDatasetName')
            .subscribe((response) => this.labels.sthWentWrong = response);
    }

    public onChooseForm(form) {
        this.defaultFormId = form.id;
        this.uploadedFormFields = form.formFields;
        this.formConfig = [];
        console.log('FOOORM: ', form);
        [...form.formFields].map(({ label, name, placeholder, type, options = null }) => {
            const fieldConfig = {
                type: type.toLowerCase(),
                label,
                name,
                placeholder,
                options
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
                    this.snackBar.open(this.labels.valuesSaved, undefined, {
                        duration: 4000,
                        extraClasses: ['success-snackbar'],
                        verticalPosition: 'top'
                    });
            },
                (error) => {
                    this.snackBar.open(this.labels.sthWentWrong, undefined, {
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
            formFields: [...this.fields]
        };
        this.formsService.saveForm(form)
            .subscribe(
                () => {
                    this.formsService.getAllForms()
                        .subscribe((forms) => {
                                this.formsToChoose = forms;
                            });
                    this.snackBar.open(this.labels.formSaved, undefined, {
                        duration: 4000,
                        extraClasses: ['success-snackbar'],
                        verticalPosition: 'top'
                    });
                },
                () => {
                    this.snackBar.open(this.labels.sthWentWrong, undefined, {
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
                this.formCreatorStore.resetAll();
                form.formFields.forEach((f) => {
                    this.formCreatorStore.addExistingField(f);
                });
            });
    }

    deleteForm(formId) {
        this.formsService.deleteForm(formId)
            .subscribe(() => {
                console.log('bumbumbum')
                this.manageFormsDialog.close();
                this.formsService.getAllForms()
                    .subscribe((forms) => {
                        this.formsToChoose = forms;
                    });
            });
    }
}
