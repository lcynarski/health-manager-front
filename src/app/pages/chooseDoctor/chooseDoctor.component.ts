import { Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Patient } from '../../_models/patient';
import { PatientService } from '../../_services/patient.service';
import {DoctorService} from "../../_services/doctor.service";
import {Doctor} from "../../_models/doctor";
import {PatientsDataSource} from "../patientsList/patientsDataSource";

@Component({
    providers: [PatientService, DoctorService],
    templateUrl: './chooseDoctor.component.html',
    styleUrls: ['./chooseDoctor.component.scss']
})

export class ChooseDoctorComponent implements OnInit {
    doctors: Doctor[];
    id: string;
    patient: Patient;

    dataSource: PatientsDataSource | null;
    columnsToDisplay = [];


    constructor(private router: Router,
                private http: Http,
                private route: ActivatedRoute,
                private patientService: PatientService,
                private doctorsService: DoctorService) {
        this.columnsToDisplay = [ 'firstName', 'lastName', 'specialization', 'choose'];
    }

    public ngOnInit() {
      this.route.params.subscribe((params) => {
            this.id = params['patientId']; // (+) converts string 'id' to a number
            this.loadPatientData();
            this.reloadDoctors();
        });
    }

    private loadPatientData() {
        this.patientService.getById(this.id)
            .subscribe((patient) => {
                this.patient = patient;
            });
    }

    reloadDoctors(){
        this.doctorsService.getAll().subscribe(docs => {
            this.doctors = docs;
            this.dataSource = new PatientsDataSource(docs);
        });
    }

    goToCalendar(doctorId: string) {
        this.router.navigate(['/pages/doctor/' + doctorId + '/patient/' + this.id]);
    }
}
