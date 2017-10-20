import { Patient } from './patient';
import { TimeSlot } from './timeslot';

export class Appointment {
    id: number;
    timeSlotId: number;
    tookPlace: boolean;
    officeNumber: number;
    data: string;
    patient: Patient;
    timeSlot: TimeSlot;
    priority: string; //LOW, NORMAL, HIGH
}
