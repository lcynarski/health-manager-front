import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { DoctorService } from '../../_services/doctor.service';

import { FieldConfig } from '../../components/dynamic-form/models/field-config.interface';
import { DynamicFormComponent } from '../../components/dynamic-form/containers/dynamic-form/dynamic-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Http } from '@angular/http';

@Component({
    providers: [DoctorService],
    selector: 'create-patient',
    styleUrls: ['createTimeslot.component.scss'],
    templateUrl: './createTimeslot.component.html'
})
export class CreateTimeslotComponent implements AfterViewInit, OnInit {
    @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
    private router: Router;
    private docIdByName;

    constructor(
        router: Router,
        private http: Http,
        private route: ActivatedRoute,
        private doctorService: DoctorService) {
        this.router = router;
    }

    config: FieldConfig[] = [
        {
            type: 'select',
            label: 'Doctor',
            name: 'doctor',
            placeholder: 'Select a doctor',
            options: []
        },
        {
            type: 'date',
            label: 'Start Date-time',
            name: 'startDateTime',
            //placeholder: 'Date-time'
        },
        {
            type: 'date',
            label: 'End Date-time',
            name: 'endDateTime',
            //placeholder: 'Date-time'
        },
        {
            type: 'checkbox',
            label: 'Available for self-sign',
            name: 'availableForSelfSign',
            value: true
        },
        {
            label: 'Submit',
            name: 'submit',
            type: 'button'
        }
    ];

    ngOnInit(): void {
        this.docIdByName = {};

        this.doctorService.getAll()
            .subscribe((doctors) => {
                doctors.forEach((doctor) => {
                    this.docIdByName[`${doctor.firstName} ${doctor.lastName}`] = doctor._id;
                })
                this.form.config[0].options = doctors.map((doctor) => `${doctor.firstName} ${doctor.lastName}`);
            })
    }

    ngAfterViewInit() {
        let previousValid = this.form.valid;
        this.form.changes.subscribe(() => {
            if (this.form.valid !== previousValid) {
                previousValid = this.form.valid;
                this.form.setDisabled('submit', !previousValid);
            }
        });
        // this.form.setDisabled('submit', true);
    }

    submit(value) {
        const timeSlot = {
            id: 0,
            startDateTime: value.startDateTime,
            endDateTime: value.endDateTime,
            availableForSelfSign: value.availableForSelfSign
        };
        this.doctorService.saveTimeSlot(timeSlot, this.docIdByName[value.doctor])
            .subscribe((data) => {
                console.log(value)
                console.log(data);
                this.router.navigate(['/dashboard']);
            });
    }
}
