// tslint:disable: max-classes-per-file
import { AppConfig } from '../../app.config';


const medcomPath = new AppConfig().medcomApiUrl;

// TODO instead of strings classes that allow to easily fill all path and url params
export class INSTANCES {
    public static GET_DICOM = medcomPath + '/patients/{patientId}/studies/{studyId}/series/{seriesId}/instances/{instanceId}';
}

export class SERIES  {
    public static GET_DETAILS = medcomPath + '/series/{seriesId}';
    public static GET_INSTANCES_LIST = medcomPath + '/series/{seriesId}/instances';
}

export class STUDIES  {
    public static GET_ALL = medcomPath + '/studies';
    public static GET_DETAILS = medcomPath + '/studies/{studyId}';
    public static GET_SERIES_LIST = medcomPath + '/studies/{studyId}/series';
}

export class PATIENT  {
    public static GET_ALL = medcomPath + '/patients';
    public static GET_STUDIES_LIST = medcomPath + '/patients/{patientId}/studies';
}

export class MODALITY  {
    public static GET_ALL = medcomPath + '/modalities';
    public static UPDATE = medcomPath + '/modalities';
    public static DELETE = medcomPath + '/modalities/{aet}';
}


