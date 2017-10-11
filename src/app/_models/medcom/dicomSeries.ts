import { DicomObject } from './dicomObject';
import { ExtendedDicomInstance } from './dicomInstance';

export interface DicomSeries extends DicomObject {
    instanceUID: string;
    studyInstanceUID: string;
    modalityAET: string;
    creationDate?: number;
}

export interface ExtendedDicomSeries extends DicomSeries {
    instances: ExtendedDicomInstance[];
}
