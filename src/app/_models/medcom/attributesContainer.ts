export class AttributesContainer {

    public static is(object: any) {
        return !!object.attributes;
    }

    attributes: object;
}
