import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Patient } from '../../_models/patient';
import { PatientService } from '../../_services/patient.service';
import { Observable } from 'rxjs/Observable';
import { PatientsDataSource } from './patientsDataSource';

@Component({

    providers: [PatientService],
    templateUrl: './patientsList.component.html',
    styleUrls: ['./patientsList.component.scss']
})

export class PatientsListComponent implements OnInit {
    @ViewChild('filter') filter: ElementRef;
    patients: Patient[] = [];
    private router: Router;
    dataSource: PatientsDataSource | null;


    constructor(private patientService: PatientService) {
        this.patients = JSON.parse(localStorage.getItem('patients'));
    }

    ngOnInit() {
        this.loadAllPatients();

        this.patients = [];
        this.dataSource = new PatientsDataSource(this.patients);
        Observable.fromEvent(this.filter.nativeElement, 'keyup')
            .debounceTime(150)
            .distinctUntilChanged()
            .subscribe(() => {
                if (!this.dataSource) {
                    return;
                }
                this.dataSource.filter = this.filter.nativeElement.value;
            });
    }

    private loadAllPatients() {
        this.patientService.getPatients().subscribe((patients) => {
            this.patients = patients;
            this.dataSource = new PatientsDataSource(this.patients);
        });
    }
}
