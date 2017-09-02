
export interface ScheduledProcedure {
    id: number;
    date: number;
    modalityId: number;
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
