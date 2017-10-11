import { DicomObject } from './dicomObject';

export interface DicomStudy extends DicomObject {
    instanceUID: string;
    patientPesel: string;
    creationDate?: number;
}
