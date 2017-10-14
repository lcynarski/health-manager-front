import { Patient } from '../patient';

export interface MedcomPatient extends Patient {
    studyCount: number;
    lastStudyDate: number;
}
