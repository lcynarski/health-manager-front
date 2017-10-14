import { DicomObject } from './dicomObject';

export interface DicomInstance extends DicomObject {
    instanceUID: string;
    seriesInstanceUID: string;
    sopClassName: string;
    creationDate?: number;
}

export interface ExtendedDicomInstance extends DicomInstance {
    dicomUrl: string;
}
