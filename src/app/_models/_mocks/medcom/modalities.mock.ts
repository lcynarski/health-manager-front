import { DicomModality } from '../../medcom/dicomModality';


export const mockModalities: DicomModality[] = [
    {
        applicationEntity: 'CT-001',
        type: 'CT',
        description: 'Computed Tomography',
        location: 'room 312',
        attributes: {}
    },
    {
        applicationEntity: 'US-001',
        type: 'US',
        description: 'Ultrasound',
        location: 'room 313',
        attributes: {}
    }
];
