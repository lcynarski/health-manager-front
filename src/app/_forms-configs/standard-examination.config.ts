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
        label: 'Submit',
        name: 'submit',
        type: 'button'
    }
];

export default standardExaminationConfig;
