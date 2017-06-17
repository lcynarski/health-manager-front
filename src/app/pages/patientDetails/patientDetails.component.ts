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
    public lat: number = 51.678418;
    public lng: number = 7.809007;

    constructor (
        router: Router,
        private http: Http,
        private route: ActivatedRoute,
        private patientService: PatientService) {
            this.router = router;
            // this.id = route.params[0];
            this.patient = JSON.parse(localStorage.getItem('patient'));
    }

    public ngOnInit() {
        this.sub = this.route.params.subscribe((params) => {
            this.id = params['patientId']; // (+) converts string 'id' to a number
            this.loadPatientData();
            this.loadPatientMedicalData();
        });

    }

    public loadPatientData() {
        console.log(this.id);
        this.patientService.getById(this.id)
            .subscribe((patient) => {
                this.patient = patient;
                this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + patient.city)
                    .map( (res) => res.json())
                    .subscribe( (response) => {
                        this.lat = response['results'][0]['geometry']['location']['lat'];
                        this.lng = response['results'][0]['geometry']['location']['lng'];
                    });
        });
        console.log(this.patient);
        return this.patient;
    }

    public loadPatientMedicalData() {
        this.patientService.getMedicalInfo(this.id)
            .subscribe((medicalInfo) => {
                this.patient.medicalInfo = medicalInfo;
                console.log(medicalInfo);
            });
    }
}
