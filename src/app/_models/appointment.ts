import { Patient } from './patient';
import { TimeSlot } from './timeslot';

export class Appointment {
    id: number;
    timeSlotId: number;
    tookPlace: boolean;
    officeNumber: number;
    data: string;
    patient: Patient;
    patientId: number;
    timeSlot: TimeSlot;
    priority: string;

    static PRIORITY_LOW = "LOW"
    static PRIORITY_NORMAL = "NORMAL"
    static PRIORITY_HIGH = "HIGH"
}
