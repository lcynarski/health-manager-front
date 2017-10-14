import { Injectable, OnInit } from '@angular/core';
import * as Rx from 'rxjs';
import { FormField } from '../_models/form';

let initialState: any[] = [];

@Injectable()
export class FieldCreatorStore {

    selectOptions: Rx.ReplaySubject<any[]> = new Rx.ReplaySubject(1);
    updates: Rx.Subject<any> = new Rx.Subject<any>();
    addNewOption: Rx.Subject<any> = new Rx.Subject<any>();
    removeOption: Rx.Subject<any> = new Rx.Subject<any>();

    constructor() {
        this.updates
            .scan((accumulator: object[], operation: Function) => {
                return operation(accumulator);
            }, initialState)
            .subscribe(this.selectOptions);
        this.addNewOption
            .map((option) => {
                return (state) => {
                    return state.concat(option);
                };
            })
            .subscribe(this.updates);
        this.removeOption
            .map((option) => {
                return (state) => {
                    return state.filter((options) => {
                        return options !== option;
                    });
                };
            })
            .subscribe(this.updates);
    }

    saveNewOption(value) {
        const optionField = {
            type: 'input',
            label: value['field-label'],
            name: value['field-name'],
            placeholder: value['field-placeholder']
        };
        this.addNewOption.next(value);
    }

    deleteOption(optionName) {
        this.removeOption.next(optionName);
    }
}