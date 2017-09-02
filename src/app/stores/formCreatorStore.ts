import { Injectable } from '@angular/core';
import * as Rx from 'rxjs';
import {FormField} from "../_models/form";

let initialState: any[] = [];

@Injectable()
export class FormCreatorStore {

    formFields: Rx.ReplaySubject<any[]> = new Rx.ReplaySubject(1);
    updates: Rx.Subject<any> = new Rx.Subject<any>();
    addNewField: Rx.Subject<any> = new Rx.Subject<any>();
    removeField: Rx.Subject<any> = new Rx.Subject<any>();

    constructor() {
        this.updates
            .scan((accumulator: object[], operation: Function) => {
                return operation(accumulator);
            }, initialState)
            .subscribe(this.formFields);
        this.addNewField
            .map((field) => {
                return (state) => {
                    return state.concat(field);
                };
            })
            .subscribe(this.updates);
        this.removeField
            .map((field) => {
                return (state) => {
                    return state.filter((fields) => {
                        return fields.name !== field;
                    });
                };
            })
            .subscribe(this.updates);
    }

    saveNewField(value) {
        const field = {
            type: 'input',
            label: value['field-label'],
            name: value['field-name'],
            placeholder: value['field-placeholder']
        };
        this.addNewField.next(field);
    }

    saveNewOptionField(value) {
        const field = {
            type: 'input',
            label: value['field-label'],
            name: value['field-name'],
            placeholder: value['field-placeholder']
        };
        this.addNewField.next(value);
    }

    addExistingField(formField: FormField) {
        this.addNewField.next({
            type: 'input',
            label: formField.label,
            name: formField.name,
            placeholder: formField.placeholder
        });
    }

    deleteField(fieldName) {
        this.removeField.next(fieldName);
    }
}