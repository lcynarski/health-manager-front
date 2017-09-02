import { DicomArchive } from '../../medcom/archive';

export const mockArchive: DicomArchive = {
    patients: [
        {
            patientId: 'Jan Kowalski',
            studies: [
                {
                    studyInstanceUid: 'study 1',
                    series: [
                        {
                            seriesInstanceUid: 'series 1',
                            dicoms: [
                                {sopInstanceUid: 'dicom 1'},
                                {sopInstanceUid: 'dicom 2'},
                                {sopInstanceUid: 'dicom 3'},
                            ]
                        },
                        {
                            seriesInstanceUid: 'series 2',
                            dicoms: [
                                {sopInstanceUid: 'dicom 1'},
                                {sopInstanceUid: 'dicom 2'},
                                {sopInstanceUid: 'dicom 3'},
                            ]
                        }
                    ]
                },
                {
                    studyInstanceUid: 'study 2',
                    series: [
                        {
                            seriesInstanceUid: 'series 1',
                            dicoms: [
                                {sopInstanceUid: 'dicom 1'},
                                {sopInstanceUid: 'dicom 2'},
                                {sopInstanceUid: 'dicom 3'},
                            ]
                        },
                        {
                            seriesInstanceUid: 'series 2',
                            dicoms: [
                                {sopInstanceUid: 'dicom 1'},
                                {sopInstanceUid: 'dicom 2'},
                                {sopInstanceUid: 'dicom 3'},
                            ]
                        }
                    ]
                },
                {
                    studyInstanceUid: 'study 3',
                    series: [
                        {
                            seriesInstanceUid: 'series 1',
                            dicoms: [
                                {sopInstanceUid: 'dicom 1'},
                                {sopInstanceUid: 'dicom 2'},
                                {sopInstanceUid: 'dicom 3'},
                            ]
                        },
                        {
                            seriesInstanceUid: 'series 2',
                            dicoms: [
                                {sopInstanceUid: 'dicom 1'},
                                {sopInstanceUid: 'dicom 2'},
                                {sopInstanceUid: 'dicom 3'},
                            ]
                        }
                    ]
                }
            ]
        },
        {
            patientId: 'Janina Kowalska',
            studies: [
                {
                    studyInstanceUid: 'study 1',
                    series: [
                        {
                            seriesInstanceUid: 'series 1',
                            dicoms: [
                                {sopInstanceUid: 'dicom 1'},
                                {sopInstanceUid: 'dicom 2'},
                                {sopInstanceUid: 'dicom 3'},
                            ]
                        },
                        {
                            seriesInstanceUid: 'series 2',
                            dicoms: [
                                {sopInstanceUid: 'dicom 1'},
                                {sopInstanceUid: 'dicom 2'},
                                {sopInstanceUid: 'dicom 3'},
                            ]
                        }
                    ]
                },
                {
                    studyInstanceUid: 'study 2',
                    series: [
                        {
                            seriesInstanceUid: 'series 1',
                            dicoms: [
                                {sopInstanceUid: 'dicom 1'},
                                {sopInstanceUid: 'dicom 2'},
                                {sopInstanceUid: 'dicom 3'},
                            ]
                        },
                        {
                            seriesInstanceUid: 'series 2',
                            dicoms: [
                                {sopInstanceUid: 'dicom 1'},
                                {sopInstanceUid: 'dicom 2'},
                                {sopInstanceUid: 'dicom 3'},
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};

