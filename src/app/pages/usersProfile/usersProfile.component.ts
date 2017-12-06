import { Component, ViewChild, AfterViewInit, OnInit, EventEmitter, Output } from '@angular/core';
import { Validators } from '@angular/forms';

import { AuthenticationService, UserService } from '../../_services/index';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { PersonalDetails } from '../../_models/personalDetails';
import { Router } from '@angular/router';
import { DynamicFormComponent } from '../../components/dynamic-form/containers/dynamic-form/dynamic-form.component';
import { FieldConfig } from '../../components/dynamic-form/models/field-config.interface';
import { MdlDialogComponent, MdlDialogService } from '@angular-mdl/core';
import {
    createPatientConfig, emergencyContactConfig, medicalHistoryDiseaseConfig,
    medicalInfoConfig
} from '../../_forms-configs';
import { AppointmentService } from '../../_services/appointment.service';
import { TranslateService } from '@ngx-translate/core';
import moment = require('moment');
import { TimeSlotService } from '../../_services/timeSlot.service';
import { DoctorService } from '../../_services/doctor.service';
import { PatientService } from '../../_services/patient.service';

@Component({
    providers: [PatientService, AppointmentService, TimeSlotService, DoctorService],
    selector: 'users-profile',
    styleUrls: ['./usersProfile.component.scss'],
    templateUrl: './usersProfile.component.html'
})

export class UsersProfileComponent implements OnInit {
    public personalDetails: PersonalDetails;
    public account: Account;
    public form: DynamicFormComponent;
    public medicalInfo;
    //---
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

    public id: string;

    public editPatientConfig = createPatientConfig;
    public medicalInfoConfig = medicalInfoConfig;
    public medicalHistoryDiseaseConfig = medicalHistoryDiseaseConfig;
    public emergencyContactConfig = emergencyContactConfig;
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
        medicalHistory: ''
    };
    //---



    constructor(private http: Http,
                private router: Router,
                private userService: UserService,
                private appointmentService: AppointmentService,
                private authService: AuthenticationService,
                private translate: TranslateService,
                private dialogService: MdlDialogService) {
    }

    public ngOnInit(): void {
        this.getPersonalDetails();
        this.loadMedicalData();
        this.loadEmergencyData();
        this.loadAppointments();

        this.translate.get('BasicInfo')
            .subscribe((res) => this.labels.basicInfo = res);
        this.translate.get('Appointments')
            .subscribe((res) => this.labels.appointments = res);
        this.translate.get('EmergencyContact')
            .subscribe((res) => this.labels.emergency = res);
        this.translate.get('Results')
            .subscribe((res) => this.labels.results = res);
        this.translate.get('MedicalHistory')
            .subscribe((res) => this.labels.medicalHistory = res);
    }

    resetPassword() {
        this.userService.resetPassword(this.authService.getEmail())
            .subscribe(
                (data) => {
                    console.log('Forgot password component data: ' + data);
                    const result = this.dialogService.alert('Succesfully reset password. Check your mailbox');
                    result.onErrorResumeNext().subscribe(() => {
                        this.router.navigate(['/']);
                    });
                },
                (error) => {
                    console.log('Reset password error: ' + error);
                    this.dialogService.alert('Something went wrong. Try again.');
                });
    }

    submit(value) {
        const personalDetails = { account: { personalDetails: { ...value } } };
        // this.patientService.savePatient(personalDetails)
        //     .subscribe((data) => console.log(data));
        console.log(personalDetails);
    }

    private getAccount() {
        this.userService.getAccount().subscribe(
            (data) => {
                this.account = data;
            }
        );
    }

    private getPersonalDetails() {
        this.userService.getPersonalDetails().subscribe(
            (data) => {
                this.personalDetails = data;
                console.log(data);
            }
        );
    }

    private saveProfilePicture(photo) {
        if (photo) {
            this.userService.saveProfilePicture('14', photo).subscribe(
                (data) => {
                    console.log('Save profile picture response: ' + data);
                });
        }
    }

    public loadMedicalData() {
        this.userService.getMedicalInfo()
            .subscribe((medicalInfo) => {
                this.medicalInfo = medicalInfo;
            });
    }

    public loadEmergencyData() {
        this.userService.getEmergencyContact()
            .subscribe((emergencyData) => {
                this.emergencyContact = emergencyData;
            });
    }

    public loadAppointments() {
        // this.appointmentService.getMyAppointments()
        //     .subscribe((appointments) => {
        //         appointments.forEach((appointment) => {
        //             this.appointmentService.getAppointmetsTime(appointment.id)
        //                 .subscribe((timeslot) => {
        //                     const fullAppointment = { ...appointment, timeslot };
        //                     this.appointments.push(fullAppointment);
        //                 });
        //         });
        //     });
    }

    //------

    editEmergencyContact(value) {
        const { birthdate } = value;
        const newDate = moment(birthdate).format('YYYY-MM-DD');
        const toSend = { ...value, birthdate: newDate};
        this.userService.editEmergencyContact(toSend)
            .subscribe((data) => {
                this.editEmergencyContactDialog.close();
                this.loadEmergencyData();
                console.log('editEmergencyContact response: ', data);
            });
    }

    addEmergencyContact(value) {
        const { birthdate } = value;
        const newDate = moment(birthdate).format('YYYY-MM-DD');
        const toSend = { ...value, birthdate: newDate};
        this.userService.saveEmergencyContact(toSend)
            .subscribe((data) => {
                this.addEmergencyContactDialog.close();
                this.loadEmergencyData();
                console.log('addEmergencyContact response: ', data);
            });
    }

    addMedicalInfo(value) {
        console.log('medicalinfovalue', value);
        this.userService.saveMedicalInfo(value)
            .subscribe((data) => {
                console.log('saveMedicalInfo', data);
                this.medicalInfoDialog.close();
                this.loadMedicalData();
            });
    }

    editMedicalInfo(value) {
        console.log('medicalinfovalue', value);
        this.userService.editMedicalInfo(value)
            .subscribe((data) => {
                console.log('saveMedicalInfo', data);
                this.medicalInfoEditDialog.close();
                this.loadMedicalData();
            });
    }

    showMedicalHistory() {
        console.log('Start date: ', this.model.startDate);
        console.log('End date: ', this.model.endDate);
        this.userService.getMedicalHistory(this.model.startDate, this.model.endDate)
            .subscribe((data) => {
                this.medicalHistory = data;
                console.log('showMedicalHistory response: ', data);
            });
    }


    onDialogShow = (dialogRef) => {
        Object.keys(this.personalDetails).forEach((key) => {
            if ((key !== 'id') && (key !== 'insuranceNumber') && (key !== 'medicalInfo') && this.editPatientForm) {
                this.editPatientForm.setValue(key, this.personalDetails[key]);
            }
        });
    }

    onMedicalInfoEditDialogShow = (dialogRef) => {
        Object.keys(this.medicalInfo).forEach((key) => {
            if ((key !== 'id') && this.medicalInfoEditForm) {
                this.medicalInfoEditForm.setValue(key, this.medicalInfo[key]);
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
