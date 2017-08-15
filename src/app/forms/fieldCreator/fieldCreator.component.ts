import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { FormsService } from '../../_services/forms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Http } from '@angular/http';
import {FormField} from "../../_models/form";

@Component({
    selector: 'field-creator',
    styleUrls: ['fieldCreator.component.scss'],
    templateUrl: './fieldCreator.component.html'
})

export class FieldsCreator implements AfterViewInit {

    public id: string;
    private field: FormField;

    constructor(id: string) {
        this.id = id;
        if (!this.field) {
            this.field = new FormField();
        }
    }

    ngAfterViewInit(): void {
        throw new Error('Method not implemented.');
    }

}
