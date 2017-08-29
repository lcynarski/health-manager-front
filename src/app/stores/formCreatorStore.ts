import { Injectable } from '@angular/core';
import * as Rx from 'rxjs';

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

    deleteField(fieldName) {
        this.removeField.next(fieldName);
    }
}