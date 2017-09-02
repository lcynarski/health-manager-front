import { ScheduledProcedure } from '../../medcom/scheduledProcedure';


export const mockScheduledProcedures: ScheduledProcedure[] = [
    {
        id: 1,
        date: 1504130965105,
        modalityId: 1,
        description: 'test study 1',
        studyInstanceUid: 'S001',
        patient: {
            id: 1,
            firstName: 'Jan',
            lastName: 'Kovalski'
        },
        doctor: {
            id: '1',
            firstName: 'Dr.',
            lastName: 'House'
        },
    },
    {
        id: 2,
        date: 1504260000000,
        modalityId: 2,
        description: 'test study 2',
        studyInstanceUid: 'S002',
        patient: {
            id: 2,
            firstName: 'Mr.',
            lastName: 'Bean'
        },
        doctor: {
            id: '1',
            firstName: 'Dr.',
            lastName: 'House'
        },
    }
];
