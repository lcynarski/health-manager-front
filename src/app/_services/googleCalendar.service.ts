import { Injectable } from "@angular/core";
declare var gapi: any;

interface AppointmentEvent {
    startDateTime: Date;
    endDateTime: Date;
    doctor: String;
}

@Injectable()
export class GoogleCalendarService {

	static clientId = '261952745745-e55n2f6jg7mn1pfacvv0iggchdmse2nc.apps.googleusercontent.com';
	static apiKey = 'AIzaSyCNsq6DWKCERx7iCDn8-gMY90tLtNlhSTA';
	static scope = 'https://www.googleapis.com/auth/calendar';
	static discoveryDocURLs = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
	
	//public isInitialized: boolean = false;
	public isInitialized: boolean = true;

	exportAppointment(event: AppointmentEvent) {
		let assertInitialized = new Promise((resolve, reject) => {
			if (this.isInitialized) {
				resolve();
			} else {
				resolve(this.initializeGapi());
			}
		});

		assertInitialized
		.then(() => this.signIn())
		.then(() => this.insertEvent(event))
		.then(() => this.signOut())
		.catch((error: any) => {console.log('inserting appointment failed: ' + error)});
	}

	private initializeGapi() {
		return this.loadClient()
		.then(() => this.initClient())
		.then(() => this.isInitialized = true)
		.catch((error: any) => {console.log('initialization failed: ' + error)});
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
				console.log(resp);
				resolve(resp);
			});
		});
	}

	private initClient() {
		return new Promise((resolve, reject) => {
			console.log('entering initClient...');
			gapi.client.init({
				apiKey: GoogleCalendarService.apiKey,
				discoveryDocs: GoogleCalendarService.discoveryDocURLs,
				clientId: GoogleCalendarService.clientId,
				scope: GoogleCalendarService.scope
			}).then(function() {
				console.log("'then' called");
				resolve();
			  }, function(error) {
				console.log('error: ' + error);
				reject();
			});
		});
	}

	private loadClient() {
		return new Promise((resolve, reject) => {
			gapi.load('client:auth2', {
				callback: resolve,
				onerror: reject,
				timeout: 1000, // 5 seconds.
				ontimeout: reject
			});
	   });
   }
}