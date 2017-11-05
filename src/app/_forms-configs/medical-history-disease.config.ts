import { FieldConfig } from '../components/dynamic-form/models/field-config.interface';
import { Validators } from '@angular/forms';

const medicalHistoryDiseaseConfig: FieldConfig[] = [
    {
        type: 'input',
        label: 'Disease Name',
        name: 'diseaseName',
        placeholder: 'Disease Name',
        validation: [Validators.required]
    },
    {
        type: 'input',
        label: 'Symptoms',
        name: 'symptoms',
        placeholder: 'Symptoms',
        validation: [Validators.required]
    },
    {
        type: 'date',
        label: 'Detection Date',
        name: 'detectionDate',
        placeholder: 'Detection Date',
        validation: [Validators.required]
    },
    {
        type: 'date',
        label: 'Cure Date',
        name: 'cureDate',
        placeholder: 'Cure Date'
    },
    {
        label: 'Submit',
        name: 'submit',
        type: 'button'
    }
];

export default medicalHistoryDiseaseConfig;
