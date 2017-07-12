import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Patient } from '../../_models/patient';
import { PatientService } from '../../_services/patient.service';

@Component({
    providers: [PatientService],
    templateUrl: './patientDetails.component.html',
    styleUrls: ['./patientDetails.component.scss']
})

export class PatientDetailsComponent implements OnInit {
    public patient: Patient;
    public id: string;
    public lat: number = 51.678418;
    public lng: number = 7.809007;;
    private router: Router;
    private sub: any;

    constructor(
        router: Router,
        private http: Http,
        private route: ActivatedRoute,
        private patientService: PatientService) {
            this.router = router;
            // this.id = route.params[0];
    }

    public ngOnInit() {
        this.sub = this.route.params.subscribe((params) => {
            this.id = params['patientId']; // (+) converts string 'id' to a number
            this.loadPatientData();
            this.loadPatientMedicalData();
        });

    }

    public loadPatientData() {
        this.patientService.getById(this.id)
            .subscribe((patient) => {
                this.patient = patient.account.personalDetails;
                this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${patient.account.personalDetails.city}`)
                    .map( (res) => res.json())
                    .subscribe( (response) => {
                        this.lat = response['results'][0]['geometry']['location']['lat'];
                        this.lng = response['results'][0]['geometry']['location']['lng'];
                    });
        });
        return this.patient;
    }

    public loadPatientMedicalData() {
        this.patientService.getMedicalInfo(this.id)
            .subscribe((medicalInfo) => {
                this.patient.medicalInfo = medicalInfo;
            });
    }
}
