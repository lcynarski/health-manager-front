import { Injectable } from "@angular/core";
declare var gapi: any;

interface AppointmentEvent {
    startDateTime: Date;
    endDateTime: Date;
    doctor: String;
}

@Injectable()
export class GoogleCalendarService {

	exportAppointment(event: AppointmentEvent) {
		return this.signIn()
		.then(() => this.insertEvent(event))
		.then(() => this.signOut())
		.catch((error: any) => {
			console.log('inserting appointment failed:');
			console.log(error);
		});
	}

	private signIn() : Promise<any> {
		return gapi.auth2.getAuthInstance().signIn();
	}

	private signOut() : Promise<any> {
		return gapi.auth2.getAuthInstance().signOut();
	}

	private insertEvent(event: AppointmentEvent) {
		return new Promise((resolve, reject) => {
			console.log(event);
			let request = gapi.client.calendar.events.insert({
				calendarId: "primary",
				resource: {
					start: { dateTime: event.startDateTime },
					end: { dateTime: event.endDateTime },
					summary: "Wizyta u lekarza: " + event.doctor
				}
			});
	
			request.execute((resp) => {
				console.log('łodpowiedź z gugla');
				console.log(resp);
				resolve(resp);
			});
		});
	}
}