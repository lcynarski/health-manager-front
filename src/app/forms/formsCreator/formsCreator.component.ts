import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { FormsService } from '../../_services/forms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Http } from '@angular/http';
import { FieldsCreatorComponent } from '../fieldCreator/fieldCreator.component';
import { Form } from '../../_models/form';
import {FormCreatorStore} from "../../stores/formCreatorStore";

@Component({
    providers: [FormsService, FormCreatorStore],
    selector: 'form-creator',
    styleUrls: ['formsCreator.component.scss'],
    templateUrl: './formsCreator.component.html'
})

export class FormsCreatorComponent implements OnInit {

    private router: Router;
    private form: Form;
    private fields: FieldsCreatorComponent[];

    constructor(router: Router,
                private http: Http,
                private route: ActivatedRoute,
                private formsService: FormsService,
                private formCreatorStore: FormCreatorStore) {
        this.router = router;
    }

    public ngOnInit() {
        this.formCreatorStore.formFields.subscribe(data => this.fields = data);
    }

    save(value) {
        console.log('This.fields:  ', this.fields);
        console.log('Value:: ', value);
    }

    // public ngOnInit() {
    //     this.route.params.subscribe((params) => {
    //         if (params['formId']) {
    //             this.loadForm(params['formId']);
    //         }
    //     });
    // }
    //
    // ngAfterViewInit(): void {
    //     console.log('Method not implemented.');
    // }
    //
    // loadForm(id: number) {
    //     this.formsService.getFormById(id)
    //         .subscribe((form) => {
    //             console.log(form);
    //             this.form = form;
    //         });
    // }
    //
    // saveForm(): void {
    //     this.formsService.saveForm(this.form)
    //         .subscribe((response) => {
    //             console.log(response);
    //         });
    // }
    //
    // addField(): void {
    //     this.fields.push(new FieldsCreatorComponent());
    // }
    //
    // removeField(id: string): void {
    //
    //     let fieldToDelete;
    //
    //     for (let i = this.fields.length - 1; i >= 0; i--) {
    //         if (this.fields[i].id === id) {
    //             fieldToDelete = this.fields[i].field.name;
    //             break;
    //         }
    //     }
    //
    //     this.form.formFields = this.form.formFields.filter((field) => field.name !== fieldToDelete);
    //
    // }
    //
    // private getRandomId(): string {
    //     return Math.random().toString(36).substr(2, 10);
    // }

}
