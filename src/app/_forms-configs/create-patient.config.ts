 import { FieldConfig } from '../components/dynamic-form/models/field-config.interface';
 import { Validators } from '@angular/forms';

 const createPatientConfig: FieldConfig[] = [
    {
        type: 'input',
        label: 'FirstName',
        name: 'firstName',
        placeholder: 'FirstName',
        validation: [Validators.required]
    },
    {
        type: 'input',
        label: 'LastName',
        name: 'lastName',
        placeholder: 'LastName',
        validation: [Validators.required]
    },
    {
        type: 'input',
        label: 'Email',
        name: 'email',
        placeholder: 'Email'
    },
    {
        type: 'date',
        label: 'birthdate',
        name: 'birthdate',
        placeholder: 'Date',
        validation: [Validators.required]
    },
    {
        type: 'input',
        label: 'PESEL',
        name: 'pesel',
        placeholder: 'PESEL',
        validation: [Validators.required, Validators.pattern('[0-9]+')]
    },
    {
        type: 'select',
        label: 'Gender',
        name: 'gender',
        options: ['Male', 'Female', 'Other'],
        placeholder: 'Gender'
    },
    {
        type: 'input',
        label: 'PhoneNumber',
        name: 'phoneNumber',
        placeholder: 'PhoneNumber',
        validation: [Validators.required]
    },
    {
        type: 'input',
        label: 'Country',
        name: 'country',
        placeholder: 'Country',
        validation: [Validators.required]
    },
    {
        type: 'input',
        label: 'City',
        name: 'city',
        placeholder: 'City',
        validation: [Validators.required]
    },
    {
        type: 'input',
        label: 'Street',
        name: 'street',
        placeholder: 'Street',
        validation: [Validators.required]
    },
    {
        type: 'input',
        label: 'BuildingNumber',
        name: 'buildingNumber',
        placeholder: 'BuildingNumber',
        validation: [Validators.required]
    },
    {
        type: 'input',
        label: 'FlatNumber',
        name: 'flatNumber',
        placeholder: 'FlatNumber'
    },
    {
        label: 'Submit',
        name: 'submit',
        type: 'button'
    }
];

 export default createPatientConfig;
