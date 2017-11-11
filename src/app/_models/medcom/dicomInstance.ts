import { DicomObject } from './dicomObject';

export class DicomInstance extends DicomObject {

    public static is(object: any) {
        return !!object.seriesInstanceUID && DicomObject.is(object);
    }

    seriesInstanceUID: string;
    sopClassName: string;
    creationDate?: number;
    dicomUrl?: string;
}
