import { DicomObject } from './dicomObject';

export class DicomStudy extends DicomObject {

    public static is(object: any) {
        return !!object.patientPesel && DicomObject.is(object);
    }

    patientPesel: string;
    creationDate?: number;
}
