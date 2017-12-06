import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { DoctorService } from '../../_services/doctor.service';
import { DynamicFormComponent } from '../../components/dynamic-form/containers/dynamic-form/dynamic-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Http } from '@angular/http';
import createDoctorConfig from '../../_forms-configs/create-doctor.config';
import moment = require('moment');
import { MatSnackBar } from '@angular/material';


@Component({
    providers: [DoctorService],
    selector: 'create-patient',
    styleUrls: ['createDoctor.component.scss'],
    templateUrl: './createDoctor.component.html'
})
export class CreateDoctorComponent implements AfterViewInit {
    @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
    public config = createDoctorConfig;
    private router: Router;

    constructor(
        router: Router,
        private http: Http,
        private route: ActivatedRoute,
        private doctorService: DoctorService,
        public snackBar: MatSnackBar) {
        this.router = router;
    }

    // config: FieldConfig[] = [
    //     {
    //         type: 'input',
    //         label: 'First Name',
    //         name: 'firstName',
    //         placeholder: 'First Name'
    //     },
    //     {
    //         type: 'input',
    //         label: 'Last Name',
    //         name: 'lastName',
    //         placeholder: 'Last Name'
    //     },
    //     {
    //         type: 'input',
    //         label: 'Specialization',
    //         name: 'specialization',
    //         placeholder: 'Specialization'
    //     },
    //     {
    //         type: 'input',
    //         label: 'Date of birth',
    //         name: 'birthdate',
    //         placeholder: 'Date'
    //     },
    //     {
    //         type: 'input',
    //         label: 'PESEL',
    //         name: 'pesel',
    //         placeholder: 'PESEL'
    //     },
    //     {
    //         type: 'select',
    //         label: 'Gender',
    //         name: 'gender',
    //         options: ['Male', 'Female', 'Other'],
    //         placeholder: 'Select an option'
    //     },
    //     {
    //         type: 'input',
    //         label: 'Phone Number',
    //         name: 'phoneNumber',
    //         placeholder: 'Phone Number'
    //     },
    //     {
    //         type: 'input',
    //         label: 'Country',
    //         name: 'country',
    //         placeholder: 'Country'
    //     },
    //     {
    //         type: 'input',
    //         label: 'City',
    //         name: 'city',
    //         placeholder: 'City'
    //     },
    //     {
    //         type: 'input',
    //         label: 'Street',
    //         name: 'street',
    //         placeholder: 'Street'
    //     },
    //     {
    //         type: 'input',
    //         label: 'Building',
    //         name: 'buildingNumber',
    //         placeholder: 'Building number'
    //     },
    //     {
    //         type: 'input',
    //         label: 'Flat',
    //         name: 'flatNumber',
    //         placeholder: 'Flat number'
    //     },
    //     {
    //         label: 'Submit',
    //         name: 'submit',
    //         type: 'button'
    //     }
    // ];

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
        const personalDetails = {
            account: { personalDetails: { ...value } },
            specialization: { description: value.specialization }
        };
        this.doctorService.saveDoctor(personalDetails)
            .subscribe((data) => {
                console.log(value);
                console.log(data);
                this.router.navigate(['/dashboard']);
            });
    }

    createDoctor(value) {
        const { email, specialization, birthdate, ...personalDetails } = value;
        const formattedDate = moment(birthdate).format('YYYY-MM-DD');
        const preparedPersonalDetails = { ...personalDetails, birthdate: formattedDate };
        const registerData = {
            email,
            specialization: {
                description: specialization
            },
            personalDetails: preparedPersonalDetails,
            role: 'ROLE_DOCTOR'
        };
        this.doctorService.createDoctorOnBehalf(registerData)
            .subscribe(
                (result) => {
                    console.log(result);
                    this.router.navigate(['/dashboard']);
                },
                (error) => {
                    this.snackBar.open(`Cannot create doctor: ${error}`, undefined, {
                        duration: 4000,
                        extraClasses: ['error-snackbar'],
                        verticalPosition: 'top'
                    });
                });
    }
}
