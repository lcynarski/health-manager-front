import { DicomObject } from './dicomObject';

export interface DicomModality extends DicomObject {
    applicationEntity: string;
    stationName?: string;
    type?: string;
    address?: string;
    port?: number;
    description?: string;
    location?: string;
}
