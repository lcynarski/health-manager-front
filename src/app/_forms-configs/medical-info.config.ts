import { FieldConfig } from '../components/dynamic-form/models/field-config.interface';
import { Validators } from '@angular/forms';

const medicalInfoConfig: FieldConfig[] = [
    {
        type: 'input',
        label: 'Weight',
        name: 'weight',
        placeholder: 'Weight',
        validation: [Validators.required]
    },
    {
        type: 'input',
        label: 'Height',
        name: 'height',
        placeholder: 'height',
        validation: [Validators.required]
    },
    {
        type: 'input',
        label: 'Allergies',
        name: 'allergies',
        placeholder: 'Allergies',
        validation: [Validators.required]
    },
    {
        type: 'input',
        label: 'Other Notes',
        name: 'otherNotes',
        placeholder: 'Other Notes'
    },
    {
        label: 'Submit',
        name: 'submit',
        type: 'button'
    }
];

export default medicalInfoConfig;
