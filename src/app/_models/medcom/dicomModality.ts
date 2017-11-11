import { AttributesContainer } from './attributesContainer';

export interface DicomModality extends AttributesContainer {
    applicationEntity: string;
    stationName?: string;
    type?: string;
    address?: string;
    port?: number;
    description?: string;
    location?: string;
}
