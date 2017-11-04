import { AttributesContainer } from './attributesContainer';

export class DicomObject extends AttributesContainer {

    public static is(object: any) {
        return !!object.instanceUID && AttributesContainer.is(object);
    }

    instanceUID: string;
}
