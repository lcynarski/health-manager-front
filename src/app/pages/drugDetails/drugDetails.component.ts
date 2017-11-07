import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientService } from '../../_services/patient.service';
import { Patient } from '../../_models/patient';
import { DrugsService } from '../../_services/drugs.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    providers: [DrugsService],
    selector: 'drug-details',
    templateUrl: 'drugDetails.component.html',
    styleUrls: ['./drugDetails.scss']
})

export class DrugDetailsComponent implements OnInit {

    public drugId;
    private drug: object;

    constructor(
        private fb: FormBuilder,
        private drugsService: DrugsService,
        private route: ActivatedRoute
    ) {
    }

    public ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            // let userId = params['userId'];
            console.log(params);
            this.drugId = params['drugId'];
        });
        this.drugsService.getDrugDetails(this.drugId)
            .subscribe((drug) => {
                this.drug = drug;
                console.log('this.drug: ', this.drug);
            });
    }
}
