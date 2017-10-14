import {Component, OnChanges, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Patient } from '../../_models/patient';
import { PatientService } from '../../_services/patient.service';
import {DynamicFormComponent} from '../../components/dynamic-form/containers/dynamic-form/dynamic-form.component';
import {FieldConfig} from '../../components/dynamic-form/models/field-config.interface';

@Component({
    providers: [PatientService],
    templateUrl: './patientDetails.component.html',
    styleUrls: ['./patientDetails.component.scss']
})

export class PatientDetailsComponent implements OnInit {
    @ViewChild(DynamicFormComponent) form: DynamicFormComponent;

    public patient: Patient;
    public id: string;
    public lat: number = 51.678418;
    public lng: number = 7.809007;
    // public form: DynamicFormComponent;
    private router: Router;
    private sub: any;

    config: FieldConfig[] = [
        {
            type: 'input',
            label: 'First Name',
            name: 'firstName',
            placeholder: 'First Name'
        },
        {
            type: 'input',
            label: 'Last Name',
            name: 'lastName',
            placeholder: 'Last Name'
        },
        {
            type: 'input',
            label: 'Date of birth',
            name: 'birthdate',
            placeholder: 'Date'
        },
        {
            type: 'input',
            label: 'PESEL',
            name: 'pesel',
            placeholder: 'PESEL'
        },
        {
            type: 'select',
            label: 'Gender',
            name: 'gender',
            options: ['Male', 'Female', 'Other'],
            placeholder: 'Select an option'
        },
        {
            type: 'input',
            label: 'Phone Number',
            name: 'phoneNumber',
            placeholder: 'Phone Number'
        },
        {
            type: 'input',
            label: 'Country',
            name: 'country',
            placeholder: 'Country'
        },
        {
            type: 'input',
            label: 'City',
            name: 'city',
            placeholder: 'City'
        },
        {
            type: 'input',
            label: 'Street',
            name: 'street',
            placeholder: 'Street'
        },
        {
            type: 'input',
            label: 'Building',
            name: 'buildingNumber',
            placeholder: 'Building number'
        },
        {
            type: 'input',
            label: 'Flat',
            name: 'flatNumber',
            placeholder: 'Flat number'
        },
        {
            label: 'Submit',
            name: 'submit',
            type: 'button'
        }
    ];

    constructor(
        router: Router,
        private http: Http,
        private route: ActivatedRoute,
        private patientService: PatientService) {
            this.router = router;
            // this.id = route.params[0];
    }

    public ngOnInit() {
        this.sub = this.route.params.subscribe((params) => {
            this.id = params['patientId']; // (+) converts string 'id' to a number
            this.loadPatientData();
            this.loadPatientMedicalData();
        });
        // this.form.setValue('name', 'Todd Motto');
        // this.patient.account.personalDetails.keys
        // for ( item in this.patient.account.personalDetails) {
        // Object.entries(this.patient.account.personalDetails).forEach(([key, value]) => {
        //     this.form.setValue(key, value);
        // };
        // Object.keys( this.patient.account.personalDetails ).forEach( key => {
        //     this.form.setValue(key, this.patient.account.personalDetails[key]);
        // });
        // }
    }

    public loadPatientData() {
        this.patientService.getById(this.id)
            .subscribe((patient) => {
                this.patient = patient;
                this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${patient.city}`)
                    .map( (res) => res.json())
                    .subscribe( (response) => {
                        this.lat = response['results'][0]['geometry']['location']['lat'];
                        this.lng = response['results'][0]['geometry']['location']['lng'];
                    });
        });
        return this.patient;
    }

    public loadPatientMedicalData() {
        // this.patientService.getMedicalInfo(this.id)
        //     .subscribe((medicalInfo) => {
        //         this.patient.medicalInfo = medicalInfo;
        //     });
    }

    submit(value) {
        const personalDetails = {
            id: this.patient.id,
            account : {
                id: this.patient.account.id,
                personalDetails : {
                    id: this.patient.account.personalDetails.id,
                    ...value
                }
            }
        };
        this.patientService.editPatient(personalDetails)
            .subscribe((data) => {
                console.log(data);
                this.router.navigate(['/patientDetails'],
                    {queryParams: {id: this.id}});
            });
    }

    onDialogShow = (dialogRef) => {
        Object.keys(this.patient).forEach(key => {
            (key !== 'id') && this.form.setValue(key, this.patient[key]);
                });
    }
}
