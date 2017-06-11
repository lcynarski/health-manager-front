import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {Patient} from '../../_models/patient';
import {PatientService} from '../../_services/patient.service';

@Component({
    providers: [PatientService],
    templateUrl: './patientDetails.component.html',
    styleUrls: ['./patientDetails.component.scss']
})

export class PatientDetailsComponent implements OnInit {
    // public id: string;
    public patient: Patient;
    // public id: string;
    private router: Router;
    public id: string;
    private sub: any;

    constructor (
        router: Router,
        private route: ActivatedRoute,
        private patientService: PatientService) {
            this.router = router;
            // this.id = route.params[0];
            this.patient = JSON.parse(localStorage.getItem('patient'));
    }

    public ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = params['patientId']; // (+) converts string 'id' to a number
            this.loadPatientData();
        });

    }

    public loadPatientData() {
        console.log(this.id);
        this.patientService.getById(this.id).subscribe((patient) => { this.patient = patient; });
        console.log(this.patient);
    }
}
