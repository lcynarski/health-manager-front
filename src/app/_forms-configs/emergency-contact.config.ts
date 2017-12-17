import { FieldConfig } from '../components/dynamic-form/models/field-config.interface';
import { Validators } from '@angular/forms';

const emergencyContactConfig: FieldConfig[] = [
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
        label: 'PhoneNumber',
        name: 'phoneNumber',
        placeholder: 'PhoneNumber',
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

export default emergencyContactConfig;
