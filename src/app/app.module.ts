import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';
import { AppConfig } from './app.config';

import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService, MedcomService} from './_services/index';
import { LoginComponent } from './login/index';
import { HomeComponent } from './home/index';
import { WelcomeComponent } from './welcome/index';
import { RegisterComponent } from './register/index';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { MedcomComponent } from './medcom/index';
import { PatientsListComponent, PatientsListItemComponent } from './patientsList/index';
import { PatientDetailsComponent } from './patientDetails/index';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
        WelcomeComponent,
        RegisterComponent,
        AlertComponent,
        MedcomComponent,
        PatientsListComponent,
        PatientsListItemComponent,
        PatientDetailsComponent
    ],
    providers: [
        AppConfig,
        AuthGuard,
        AuthenticationService,
        UserService,
        AlertService,
        MedcomService,
        { provide: LocationStrategy, useClass: HashLocationStrategy }
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }

// @NgModule({
//     imports: [
//         BrowserModule
//     ],
//     declarations: [
//         AppComponent
//     ],
//     bootstrap: [ AppComponent ]
// })
// export class AppModule { }
