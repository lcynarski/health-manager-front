import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { Patient } from '../../_models/patient';
import { PatientService } from '../../_services/patient.service';
import { DynamicFormComponent } from '../../components/dynamic-form/containers/dynamic-form/dynamic-form.component';
import {
    createPatientConfig,
    medicalInfoConfig,
    medicalHistoryDiseaseConfig,
    emergencyContactConfig
} from '../../_forms-configs';
import moment = require('moment');
import { MdlDialogComponent } from '@angular-mdl/core';
import { AppointmentService } from '../../_services/appointment.service';
import { TimeSlotService } from '../../_services/timeSlot.service';
import { DoctorService } from '../../_services/doctor.service';
import { TranslateService } from '@ngx-translate/core';
import { PrescriptionsService } from '../../_services/prescriptions.service';


@Component({
    providers: [PatientService, AppointmentService, TimeSlotService, DoctorService, PrescriptionsService],
    selector: 'patient-details',
    templateUrl: './patientDetails.component.html',
    styleUrls: ['./patientDetails.component.scss']
})

export class PatientDetailsComponent implements OnInit {
    @ViewChild('editPatientForm') editPatientForm: DynamicFormComponent;
    @ViewChild('medicalInfoEditForm') medicalInfoEditForm: DynamicFormComponent;
    @ViewChild('medicalHistoryItemForm') medicalHistoryItemForm: DynamicFormComponent;
    @ViewChild('editEmergencyContactForm') editEmergencyContactForm: DynamicFormComponent;
    @ViewChild('addEmergencyContactDialog') addEmergencyContactDialog: MdlDialogComponent;
    @ViewChild('addToMedicalHistoryDialog') addToMedicalHistoryDialog: MdlDialogComponent;
    @ViewChild('medicalInfoEditDialog') medicalInfoEditDialog: MdlDialogComponent;
    @ViewChild('medicalInfoDialog') medicalInfoDialog: MdlDialogComponent;
    @ViewChild('editUserDialog') editUserDialog: MdlDialogComponent;
    @ViewChild('editEmergencyContactDialog') editEmergencyContactDialog: MdlDialogComponent;
    @Input() patient: Patient;

    public id: string;
    public editPatientConfig = createPatientConfig;
    public medicalInfoConfig = medicalInfoConfig;
    public medicalHistoryDiseaseConfig = medicalHistoryDiseaseConfig;
    public emergencyContactConfig = emergencyContactConfig;
    private router: Router;
    private sub: any;
    private medicalHistory: any;
    private emergencyContact: any;
    private model: any = {};
    private appointments: any;
    private labels = {
        basicInfo: '',
        appointments: '',
        emergency: '',
        results: '',
        prescriptions: '',
        medicalHistory: ''
    };
    private prescriptions = [];

    constructor(router: Router,
                private http: Http,
                private route: ActivatedRoute,
                private patientService: PatientService,
                private appoitmentService: AppointmentService,
                private translate: TranslateService,
                private prescriptionService: PrescriptionsService) {
        this.router = router;
    }

    public ngOnInit() {
        console.log(this.editPatientConfig);
        console.log(this.medicalInfoConfig);
        this.appointments = [];
        this.sub = this.route.params.subscribe((params) => {
            this.id = params['patientId']; // (+) converts string 'id' to a number
            this.loadPatientData();
            this.loadPatientMedicalData();
            this.loadEmergencyData();
            this.loadAppointments();
            this.loadPrescriptions();
            this.showMedicalHistory();
        });

        this.translate.get('BasicInfo')
            .subscribe((res) => this.labels.basicInfo = res);
        this.translate.get('Appointments')
            .subscribe((res) => this.labels.appointments = res);
        this.translate.get('EmergencyContact')
            .subscribe((res) => this.labels.emergency = res);
        this.translate.get('Results')
            .subscribe((res) => this.labels.results = res);
        this.translate.get('Prescriptions')
            .subscribe((res) => this.labels.prescriptions = res);
        this.translate.get('MedicalHistory')
            .subscribe((res) => this.labels.medicalHistory = res);
    }

    public loadPatientData() {
        const id = this.id || this.patient.id
        this.patientService.getById(id)
            .subscribe((patient) => {
                this.patient = patient;
                const { birthdate } = patient;
                const formattedDate = moment(birthdate).format('YYYY-MM-DD');
                this.patient = { ...this.patient, birthdate: formattedDate };
                this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${patient.city}`)
                    .map((res) => res.json())
                    .subscribe((response) => {
                        // this.lat = response['results'][0]['geometry']['location']['lat'];
                        // this.lng = response['results'][0]['geometry']['location']['lng'];
                    });
            });
        return this.patient;
    }

    public loadPatientMedicalData() {
        const id = this.id || this.patient.id;
        this.patientService.getMedicalInfo(id)
            .subscribe((medicalInfo) => {
                this.patient.medicalInfo = medicalInfo;
            });
    }

    public loadEmergencyData() {
        const id = this.id || this.patient.id;
        this.patientService.getEmergencyContact(id)
            .subscribe((emergencyData) => {
                this.emergencyContact = emergencyData;
            });
    }

    public loadAppointments() {
        const id = this.id || this.patient.id;
        this.appoitmentService.getAllPatientsAppointments(id)
            .subscribe((appointments) => {
                appointments.forEach((appointment) => {
                    this.appoitmentService.getAppointmetsTime(appointment.id)
                        .subscribe((timeslot) => {
                           const fullAppointment = { ...appointment, timeslot };
                           this.appointments.push(fullAppointment);
                        });
                });
            });
    }

    loadPrescriptions() {
        const id = this.id || this.patient.id;
        this.prescriptionService.getPrescriptionsForPatient(id)
            .subscribe((prescriptions) => {
                console.log(prescriptions);
                this.prescriptions = prescriptions;
            });
    }

    submit(value) {
        const personalDetails = {
            id: this.patient.id,
            ...value
        };
        this.patientService.editPatient(personalDetails)
            .subscribe((data) => {
                console.log(data);
                this.patient = data;
                this.editUserDialog.close();
            });
    }

    addMedicalInfo(value) {
        console.log('medicalinfovalue', value);
        this.patientService.saveMedicalInfo(this.patient.id, value)
            .subscribe((data) => {
                console.log('saveMedicalInfo', data);
                this.medicalInfoDialog.close();
                this.loadPatientMedicalData();
            });
    }

    editMedicalInfo(value) {
        console.log('medicalinfovalue', value);
        this.patientService.updateMedicalInfo(this.patient.id, value)
            .subscribe((data) => {
                console.log('saveMedicalInfo', data);
                this.medicalInfoEditDialog.close();
                this.loadPatientMedicalData();
            });
    }

    showMedicalHistory() {
        const id = this.id || this.patient.id;
        console.log('Start date: ', this.model.startDate);
        console.log('End date: ', this.model.endDate);
        this.patientService.getMedicalHistory(id, this.model.startDate, this.model.endDate)
            .subscribe((data) => {
                this.medicalHistory = data;
                console.log('showMedicalHistory response: ', data);
            });
    }

    addToMedicalHistory(value) {
        this.patientService.addToMedicalHistory(this.patient.id, value)
            .subscribe((data) => {
                this.addToMedicalHistoryDialog.close();
                console.log('addToMedicalHistory response: ', data);
            });
    }

    addEmergencyContact(value) {
        const { birthdate } = value;
        const newDate = moment(birthdate).format('YYYY-MM-DD');
        const toSend = { ...value, birthdate: newDate};
        this.patientService.addEmergencyContact(this.patient.id, toSend)
            .subscribe((data) => {
                this.addEmergencyContactDialog.close();
                this.loadEmergencyData();
                console.log('addEmergencyContact response: ', data);
            });
    }

    editEmergencyContact(value) {
        const { birthdate } = value;
        const newDate = moment(birthdate).format('YYYY-MM-DD');
        const toSend = { ...value, birthdate: newDate};
        this.patientService.editEmergencyContact(this.patient.id, toSend)
            .subscribe((data) => {
                this.editEmergencyContactDialog.close();
                this.loadEmergencyData();
                console.log('editEmergencyContact response: ', data);
            });
    }

    public sendMail(emailId, subject, message) {
        window.open('mailto:' + emailId + '?subject=' + subject + '&body=' + message, '_self');
    }

    onDialogShow = (dialogRef) => {
        Object.keys(this.patient).forEach((key) => {
            if ((key !== 'id') && (key !== 'insuranceNumber') && (key !== 'medicalInfo') && this.editPatientForm) {
                this.editPatientForm.setValue(key, this.patient[key]);
            }
        });
    }

    onMedicalInfoDialogShow = (dialogRef) => {
    }

    onMedicalInfoEditDialogShow = (dialogRef) => {
        Object.keys(this.patient.medicalInfo).forEach((key) => {
            if ((key !== 'id') && this.medicalInfoEditForm) {
                this.medicalInfoEditForm.setValue(key, this.patient.medicalInfo[key]);
            }
        });
    }

    onEditEmergencyContactDialogShow = (dialogRef) => {
        Object.keys(this.emergencyContact).forEach((key) => {
            if ((key !== 'id') && this.medicalInfoEditForm) {
                this.editEmergencyContactForm.setValue(key, this.emergencyContact[key]);
            }
        });
    }
}
