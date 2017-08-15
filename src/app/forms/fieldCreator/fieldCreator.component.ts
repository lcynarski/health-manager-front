import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { FormsService } from '../../_services/forms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Http } from '@angular/http';

@Component({
    selector: 'field-creator',
    styleUrls: ['fieldCreator.component.scss'],
    templateUrl: './fieldCreator.component.html'
})

export class FieldsCreator implements AfterViewInit {

    constructor(
        router: Router,
        private http: Http,
        private route: ActivatedRoute,
        private formsService: FormsService) {
    }

    ngAfterViewInit(): void {
        throw new Error('Method not implemented.');
    }

}
