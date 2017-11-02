import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Patient } from '../../_models/patient';
import { PatientService } from '../../_services/patient.service';
import { PatientsListItemComponent } from './patients-list-item.component';

@Component({

    providers: [PatientService],
    templateUrl: './patientsList.component.html',
    styleUrls: ['./patientsList.component.scss']
})

export class PatientsListComponent implements OnInit {
    patients: Patient[] = [];
    private router: Router;

    constructor(private patientService: PatientService) {
        this.patients = JSON.parse(localStorage.getItem('patients'));
    }

    ngOnInit() {
        this.loadAllPatients();
    }

    private loadAllPatients() {
        this.patientService.getPatients().subscribe((patients) => {
            this.patients = patients;
        });
    }

    public viewDetails(id): void {
        this.router.navigate(['/patientDetails', { userId: id }]);
    }

    public viewDoctorsList(id): void {
        this.router.navigate(['/doctorsList/patient', { patientId: id }]);
    }

}