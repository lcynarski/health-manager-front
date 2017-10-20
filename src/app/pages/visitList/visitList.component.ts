import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarEvent } from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { ModalComponent } from 'ng2-bs4-modal/ng2-bs4-modal';
import { DoctorService } from "../../_services/doctor.service";
import { Doctor } from "../../_models/doctor";
import { Patient } from "../../_models/patient";
import { TimeSlot } from "../../_models/timeslot";
import { CreateTimeslotComponent } from "../../pages/createTimeslot";
import { PatientService } from "../../_services/patient.service";
import { AppointmentService } from "../../_services/appointment.service";
import { TimeSlotService } from "../../_services/timeSlot.service";
import { Appointment } from "../../_models/appointment";
import { AuthenticationService } from '../../_services/authentication.service';
import { Observable } from "rxjs/Observable";

import { FieldConfig } from '../../components/dynamic-form/models/field-config.interface';

@Component({
    providers: [DoctorService, PatientService, AppointmentService, TimeSlotService],
    templateUrl: './visitList.component.html',
    styleUrls: ['./visitList.component.scss']
})
export class VisitListComponent implements OnInit {
    constructor(private route: ActivatedRoute,
        private doctorService: DoctorService,
        private patientService: PatientService,
        private appointmentService: AppointmentService,
        private timeSlotService: TimeSlotService,
        private authService: AuthenticationService,
        private router: Router) {
    }

    ngOnInit() {
        console.log("INIT VISIT LIST")
    }
}        