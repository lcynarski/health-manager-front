import {Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {  ChangeDetectionStrategy } from '@angular/core';
import { CalendarEvent, CalendarDateFormatter } from 'angular-calendar';
import { ModalComponent } from 'ng2-bs4-modal/ng2-bs4-modal';
import {Doctor} from "../../_models/doctor";
import {DoctorService} from "../../_services/doctor.service";


@Component({
    providers: [DoctorService],
    templateUrl: './doctorsList.component.html',
    // changeDetection: ChangeDetectionStrategy.OnPush,
    // styleUrls: ['./visitsCalendar.component.scss']
})
export class DoctorsListComponent implements OnInit {

    constructor(private doctorService: DoctorService, private router: Router ) {

    }



    doctors: Doctor[];

    reloadDoctors(){

        this.doctors =  this.doctorService.getAll();
    }

    goToDetails(doctorId: string) {
        console.log("szakalaka " + doctorId);
        // this.router.navigate(['medcom']);
        this.router.navigate(['/pages/doctor/' + doctorId]);
    }



    ngOnInit() {
        this.reloadDoctors();
    }




}
