/** simplified model - likely to be changed or extended later on **/

export interface DicomArchive {
    patients: DicomPatient[];
}

export interface DicomPatient {
    patientId: string;
    studies: DicomStudy[];
}

export interface DicomStudy {
    studyInstanceUid: string;
    patientId?: string;
    series: DicomSeries[];
}

export interface DicomSeries {
    seriesInstanceUid: string;
    dicoms: DicomInstance[];
}

export interface DicomInstance {
    sopInstanceUid: string;
}

