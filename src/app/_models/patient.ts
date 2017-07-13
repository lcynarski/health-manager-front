import { MedicalData } from './medicalData';
import { PersonalDetails } from './personalDetails';
import { Account } from './account';

export class Patient {
    id: number;
    account: Account;
    emergencyContact: PersonalDetails;
    medicalInfo: MedicalData;
}
