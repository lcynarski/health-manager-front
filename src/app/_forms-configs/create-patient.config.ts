 import { FieldConfig } from '../components/dynamic-form/models/field-config.interface';
 import { Validators } from '@angular/forms';

 const createPatientConfig: FieldConfig[] = [
    {
        type: 'input',
        label: 'First Name',
        name: 'firstName',
        placeholder: 'First Name',
        validation: [Validators.required]
    },
    {
        type: 'input',
        label: 'Last Name',
        name: 'lastName',
        placeholder: 'Last Name',
        validation: [Validators.required]
    },
    {
        type: 'date',
        label: 'Date of birth',
        name: 'birthdate',
        placeholder: 'Date',
        validation: [Validators.required]
    },
    {
        type: 'input',
        label: 'PESEL',
        name: 'pesel',
        placeholder: 'PESEL',
        validation: [Validators.required, Validators.pattern('[0-9][0-9][0-1][0-9][0-3][0-9][0-9][0-9][0-9][0-9][0-9]')]
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
        placeholder: 'Phone Number',
        validation: [Validators.required, Validators.pattern('[0-9]+')]
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
        label: 'Building',
        name: 'buildingNumber',
        placeholder: 'Building number',
        validation: [Validators.required]
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

 export default createPatientConfig;