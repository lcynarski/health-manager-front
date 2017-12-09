import {Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {  ChangeDetectionStrategy } from '@angular/core';
import { CalendarEvent, CalendarDateFormatter } from 'angular-calendar';
import { ModalComponent } from 'ng2-bs4-modal/ng2-bs4-modal';
import {Doctor} from "../../_models/doctor";
import {DoctorService} from "../../_services/doctor.service";
import {PatientsDataSource} from "../patientsList/patientsDataSource";
import {TranslateService} from "@ngx-translate/core";

@Component({
    providers: [DoctorService],
    templateUrl: './doctorsList.component.html'
})
export class DoctorsListComponent implements OnInit {

    constructor(private doctorService: DoctorService,
                private router: Router ) {

    }

    doctors: Doctor[];
    dataSource: PatientsDataSource | null;
    columnsToDisplay = [];

    reloadDoctors(){

         this.doctorService.getAll().subscribe(docs => {
             this.dataSource = new PatientsDataSource(docs);
             this.doctors = docs;
         });
    }

    goToDetails(doctorId: string) {
        this.router.navigate(['/pages/doctor/' + doctorId]);
    }

    showTimeTable(){
        this.router.navigate(['/pages/timeTable']);
    }


    ngOnInit() {
        this.columnsToDisplay = [ 'firstName', 'lastName', 'specialization', 'calendar'];
        this.reloadDoctors();
    }




}
