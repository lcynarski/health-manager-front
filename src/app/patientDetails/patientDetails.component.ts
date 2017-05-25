import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {Patient} from "../_models/patient";
import {PatientService} from "../_services/patient.service";

@Component({

    templateUrl: 'patientDetails.component.html'
})

export class PatientDetailsComponent implements OnInit {
    patients: Patient[] = [];

    constructor(private patientService: PatientService) {
        this.patients = JSON.parse(localStorage.getItem('patients'));
    }

    ngOnInit() {
        this.loadAllPatients();
    }

    private loadAllPatients() {
        this.patientService.getAll().subscribe(patients => { this.patients = patients; });
    }
}