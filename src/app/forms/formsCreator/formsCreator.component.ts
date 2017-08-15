import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { FormsService } from '../../_services/forms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Http } from '@angular/http';
import {FieldsCreator} from "../fieldCreator/fieldCreator.component";

@Component({
    providers: [FormsService],
    selector: 'form-creator',
    styleUrls: ['formCreator.component.scss'],
    templateUrl: './formCreator.component.html'
})

export class FormsCreator implements AfterViewInit {

    private router: Router;
    private fields: FieldsCreator[];

    constructor(
        router: Router,
        private http: Http,
        private route: ActivatedRoute,
        private formsService: FormsService) {
        this.router = router;
    }

    ngAfterViewInit(): void {
        throw new Error('Method not implemented.');
    }

    saveForm(): void {
        return null;
    }

    addField(): void {

        this.fields.push(new FieldsCreator())

    }

    removeField(): void {

    }






}
