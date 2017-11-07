import { FieldConfig } from '../components/dynamic-form/models/field-config.interface';
import { Validators } from '@angular/forms';

const standardExaminationConfig: FieldConfig[] = [
    {
        type: 'textarea',
        label: 'Symptoms',
        name: 'symptoms',
        placeholder: 'Symptoms',
        validation: [Validators.required]
    },
    {
        type: 'input',
        label: 'Temperature',
        name: 'temperature',
        placeholder: 'Temperature',
        validation: [Validators.required]
    },
    {
        type: 'checkbox',
        label: 'UsedDrugs',
        name: 'usedDrugs',
        placeholder: 'Used Drugs'
    },
    {
        type: 'checkbox',
        label: 'Dangerous',
        name: 'dangerous',
        placeholder: 'Dangerous'
    },
    {
        label: 'Submit',
        name: 'submit',
        type: 'button'
    }
];

export default standardExaminationConfig;
