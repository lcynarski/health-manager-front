import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {FormsService} from '../../_services/forms.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Http} from '@angular/http';
import {FieldsCreator} from "../fieldCreator/fieldCreator.component";
import {Form} from "../../_models/form";

@Component({
    providers: [FormsService],
    selector: 'form-creator',
    styleUrls: ['formCreator.component.scss'],
    templateUrl: './formCreator.component.html'
})

export class FormsCreator implements AfterViewInit {

    private router: Router;
    private form: Form;
    private fields: FieldsCreator[];

    constructor(router: Router,
                private http: Http,
                private route: ActivatedRoute,
                private formsService: FormsService) {
        this.router = router;
    }

    public ngOnInit() {
        this.route.params.subscribe((params) => {
            if (params['formId']) {
                this.loadForm(params['formId']);
            }
        });
    }

    ngAfterViewInit(): void {
        throw new Error('Method not implemented.');
    }

    loadForm(id: number) {
        this.formsService.getFormById(id)
            .subscribe((form) => {
                console.log(form);
            });
    }

    saveForm(): void {
        this.formsService.saveForm(this.form)
            .subscribe((response) => {
                console.log(response);
            });
    }

    addField(): void {
        this.fields.push(new FieldsCreator(this.getRandomId()));
    }

    removeField(id: string): void {
        this.fields = this.fields.filter(field => field.id !== id);
    }

    private getRandomId(): string {
        return Math.random().toString(36).substr(2, 10);
    }

}
