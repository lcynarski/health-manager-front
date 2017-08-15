import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Angular2SocialLoginModule } from 'angular2-social-login';
import { AgmCoreModule } from '@agm/core';
import { MdlModule } from '@angular-mdl/core';

import { AppComponent }  from './app.component';
import { AppState, InternalStateType } from './app.service';
import { GlobalState } from './global.state';
import { routing }        from './app.routing';
import { AppConfig } from './app.config';
import { NgaModule } from './navigation/nga.module';
import { NgUploaderModule, NgFileSelectDirective } from 'ngx-uploader';

import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService, MedcomService} from './_services/index';
import { LoginComponent } from './login/index';
import { ForgotPasswordComponent } from './forgot-password/index';
import { HomeComponent } from './home/index';
import { WelcomeComponent } from './welcome/index';
import { RegisterComponent } from './register/index';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { PatientsListComponent, PatientsListItemComponent } from './pages/patientsList/index';
import { PatientDetailsComponent } from './pages/patientDetails/index';

import { PersonalDetailsFormComponent } from './personal-details-form/index';
import { InlineEditComponent } from './components/inline-edit/index';
import { PagesModule } from './pages/pages.module';
import {FieldsCreatorComponent} from "./forms/fieldCreator/fieldCreator.component";

// const socialProviders = {
//     google: {
//         clientId: '943362751958-kcdagrreknm3e3h26qrasdf3fpupildi.apps.googleusercontent.com'
//     }
// };

const APP_PROVIDERS = [
    AppState,
    GlobalState
];

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        routing,
        Angular2SocialLoginModule,
        PagesModule,
        NgaModule.forRoot(),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyAVY4MA8FBzN8gFd1v0cF-RAOcdwukvJKQ'
        }),
        MdlModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
        WelcomeComponent,
        RegisterComponent,
        AlertComponent,
        ForgotPasswordComponent,
        PersonalDetailsFormComponent,
        InlineEditComponent,
        FieldsCreatorComponent
    ],
    providers: [
        AppConfig,
        AuthGuard,
        AuthenticationService,
        UserService,
        AlertService,
        MedcomService,
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        APP_PROVIDERS
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }

// Angular2SocialLoginModule.loadProvidersScripts(socialProviders);

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
