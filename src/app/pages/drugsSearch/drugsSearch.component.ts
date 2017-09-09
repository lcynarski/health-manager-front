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
                  (submit)="onSubmit($event)">
                <div>
                    Enter patient's PESEL number:
                </div>
                <p>
                    <mdl-textfield
                            label="DRUG NAME"
                            name="drugName" type="text"
                            formControlName="drugName"
                            floating-label
                            (input)="onSubmit($event.target.value)"></mdl-textfield>
                </p>
                <p>
                    <button mdl-button type="submit" [disabled]="!form.valid" mdl-button-type="raised" mdl-ripple mdl-colored="primary">Submit</button>
                </p>
            </form>
            <mdl-list *ngIf="drugs">
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

    public disableForm = false;
    public form: FormGroup;
    public pesel = new FormControl('', Validators.required);
    public drugName = new FormControl('', Validators.required);
    // public lastName = new FormControl('');
    public patient: Patient;
    drugs;

    constructor(private fb: FormBuilder, private drugsService: DrugsService) {}

    public ngOnInit() {
        this.form = this.fb.group({
            drugName: this.drugName
        });
        // this.form.valueChanges
        //     .map((formValues) => {
        //         formValues.pesel = formValues.pesel;
        //         return formValues;
        //     })
        //     // .filter((formValues) => this.form.valid)
        //     .subscribe((formValues) => {
        //         console.log(`Model Driven Form valid: ${this.form.valid} value:`, JSON.stringify(formValues));
        //     });
    }

    public onSubmit(value) {
        console.log(this.form.value.drugName);
        this.getDrugsByName(this.form.value.drugName);
    }

    public onDisableForm(formDisabled: boolean) {
        if ( formDisabled ) {
            this.form.disable();
        } else {
            this.form.enable();
        }
    }
    //
    // private getPatientByPesel(pesel) {
    //     this.patientService.getPatientByPesel(pesel)
    //         .subscribe( (patients) => { this.patient = patients; });
    // }
    //
    private getDrugsByName(name) {
        this.drugsService.getDrugsByName(name)
            .subscribe((drugs) => { this.drugs = drugs; });
    }

}
