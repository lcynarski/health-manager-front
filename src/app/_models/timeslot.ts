export class TimeSlot {
    id: number;
    startDateTime: Date;
    endDateTime: Date;
    availableForSelfSign: boolean; // whether patient can see and sign for this timeslot in calendar
}
