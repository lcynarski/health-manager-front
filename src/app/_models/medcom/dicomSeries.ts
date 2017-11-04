import { DicomObject } from './dicomObject';
import { ExtendedDicomInstance } from './dicomInstance';

export class DicomSeries extends DicomObject {

    public static is(object: any) {
        return !!object.studyInstanceUID && DicomObject.is(object);
    }

    studyInstanceUID: string;
    modalityAET: string;
    creationDate?: number;
}

export interface ExtendedDicomSeries extends DicomSeries {
    instances: ExtendedDicomInstance[];
}
