import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientService } from '../../_services/patient.service';
import { Patient } from '../../_models/patient';
import { DrugsService } from '../../_services/drugs.service';

@Component({
    providers: [DrugsService],
    selector: 'drugs-search',
    templateUrl: 'drugsSearch.component.html',
    styleUrls: ['./drugsSearch.component.scss']
})

export class DrugsSearchComponent implements OnInit {

    private form: FormGroup;
    private drugName = new FormControl('', Validators.required);
    private drugs;
    private page: number;
    private searchedValue: string;
    private searchedName: string;

    constructor(private fb: FormBuilder, private drugsService: DrugsService) {
    }

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
        if (formDisabled) {
            this.form.disable();
        } else {
            this.form.enable();
        }
    }

    private getDrugsByName(name) {
        this.drugsService.getDrugsByName(name)
            .subscribe((drugs) => {
                this.drugs = drugs;
            });
    }

    private getDrugsByNamePageable(name, page, size) {
        this.drugsService.getDrugsByNamePageable(name, page, size)
            .subscribe((drugs) => {
                this.drugs = drugs.content;
            });
    }

    private onScroll() {
        this.page++;
        this.drugsService.getDrugsByNamePageable(this.searchedValue, this.page, 30)
            .subscribe((drugs) => {
                Array.prototype.push.apply(this.drugs, drugs.content);
            });
    }
}
