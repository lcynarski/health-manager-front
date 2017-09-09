import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientService } from '../../_services/patient.service';
import { Patient } from '../../_models/patient';
import {DrugsService} from '../../_services/drugs.service';

@Component({
    providers: [DrugsService],
    selector: 'drugs-search',
    styleUrls: ['./drugsSearch.component.scss'],
    template: `
        <div>
            <form [formGroup]="form"
                  (submit)="onSubmit($event)"
                    class="search-form"
            >
                <div>
                    Start typing drug's name:
                </div>
                <p>
                    <mdl-textfield
                            label="DRUG NAME"
                            name="drugName" type="text"
                            formControlName="drugName"
                            floating-label
                            (input)="onSubmit($event.target.value)"></mdl-textfield>
                </p>
            </form>
            <mdl-list *ngIf="drugs"
                      infiniteScroll
                      [infiniteScrollDistance]="2"
                      [infiniteScrollThrottle]="700"
                      (scrolled)="onScroll()"
            >
                <mdl-list-item *ngFor="let drug of drugs">
                    <mdl-list-item-primary-content >
                        <mdl-icon mdl-list-item-icon>healing</mdl-icon>
                        {{ drug.name }}
                    </mdl-list-item-primary-content>
                </mdl-list-item>
            </mdl-list>
        </div>
    `
})

export class DrugsSearchComponent implements OnInit{

    private form: FormGroup;
    private drugName = new FormControl('', Validators.required);
    private drugs;
    private page: number;
    private searchedValue: string;

    constructor(private fb: FormBuilder, private drugsService: DrugsService) {}

    public ngOnInit() {
        this.form = this.fb.group({
            drugName: this.drugName
        });
        this.page = 0;
    }

    public onSubmit(value) {
        this.page = 0;
        this.searchedValue = value;
        this.getDrugsByNamePageable(this.form.value.drugName, this.page, 20);
        // this.getDrugsByName(this.form.value.drugName);
    }

    public onDisableForm(formDisabled: boolean) {
        if ( formDisabled ) {
            this.form.disable();
        } else {
            this.form.enable();
        }
    }

    private getDrugsByName(name) {
        this.drugsService.getDrugsByName(name)
            .subscribe((drugs) => { this.drugs = drugs; });
    }

    private getDrugsByNamePageable(name, page, size) {
        this.drugsService.getDrugsByNamePageable(name, page, size)
            .subscribe((drugs) => { this.drugs = drugs.content; });
    }

    private onScroll() {
        this.page++;
        this.drugsService.getDrugsByNamePageable(name, this.page, 30)
            .subscribe((drugs) => { Array.prototype.push.apply(this.drugs, drugs.content); });
    }
}
