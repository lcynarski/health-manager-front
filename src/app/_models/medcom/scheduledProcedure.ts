
export interface ScheduledProcedure {
    id: number;
    date: number;
    modalityAET: string;
    description: string;
    studyInstanceUid: string;
    patient: {
        id: number;
        firstName: string;
        lastName: string;
    };
    doctor: {
        id: string;
        firstName: string;
        lastName: string;
    };
}
