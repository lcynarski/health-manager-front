import { Component, ViewChild, AfterViewInit } from '@angular/core';
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
export class CreateTimeslotComponent implements AfterViewInit {
    @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
    private router: Router;

    constructor(
        router: Router,
        private http: Http,
        private route: ActivatedRoute,
        private doctorService: DoctorService) {
        this.router = router;
    }

    config: FieldConfig[] = [
        {
            type: 'input',
            label: 'Doctor ID',
            name: 'doctorId',
            placeholder: 'ID'
        },
        {
            type: 'input',
            label: 'Start Date-time',
            name: 'startDateTime',
            placeholder: 'Date-time'
        },
        {
            type: 'input',
            label: 'End Date-time',
            name: 'endDateTime',
            placeholder: 'Date-time'
        },
        {
            label: 'Submit',
            name: 'submit',
            type: 'button'
        }
    ];

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
            endDateTime: value.endDateTime
        };
        this.doctorService.saveTimeSlot(timeSlot, value.doctorId)
            .subscribe((data) => {
                console.log(value)
                console.log(data);
                this.router.navigate(['/dashboard']);
            });
    }
}
