import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Patient } from '../../_models/patient';
import { PatientService } from '../../_services/patient.service';
import { Observable } from 'rxjs/Observable';
import { PatientsDataSource } from './patientsDataSource';
import { PatientsListItemComponent } from './patients-list-item.component';
import {AuthenticationService} from "../../_services/authentication.service";

@Component({

    providers: [PatientService, AuthenticationService],
    templateUrl: './patientsList.component.html',
    styleUrls: ['./patientsList.component.scss']
})

export class PatientsListComponent implements OnInit {
    @ViewChild('filter') filter: ElementRef;
    patients: Patient[] = [];
    private router: Router;
    dataSource: PatientsDataSource | null;

    isReceptionist: boolean;
    columnsToDisplay = [];

    constructor(private patientService: PatientService,
                private authenticationService: AuthenticationService) {
        this.patients = JSON.parse(localStorage.getItem('patients'));
        this.isReceptionist = authenticationService.isReceptionist();
    }

    ngOnInit() {
        this.loadAllPatients();

        this.patients = [];
        this.columnsToDisplay = this.isReceptionist ? ['id', 'firstName', 'lastName', 'birthdate', 'registerVisit'] : ['id', 'firstName', 'lastName', 'birthdate'];
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

    public viewDetails(id): void {
        this.router.navigate(['/patientDetails', { userId: id }]);
    }

    public viewDoctorsList(id): void {
        this.router.navigate(['/doctorsList/patient', { patientId: id }]);
    }

}
