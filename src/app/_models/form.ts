import { User } from "./user";

export class Form {
    id: number;
    name: string;
    formFields: FormField[];
    owner: User;
}

export class FormField {
    id: number;
    name: string;
    label: string;
    value: string;
    isRequired: boolean;
    isEditable: boolean;
    placeholder: string;
    contextualText: string;
    warningText: string;
    errorText: string;
    fieldAvailableValues: FormAvailableValue[];
}

export class FormFieldType {
    id: number;
    type: string;
}

export class FormAvailableValue {
    id: number;
    name: string;
    value: string;
}