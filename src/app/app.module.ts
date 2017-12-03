import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Http, HttpModule } from '@angular/http';
import { Angular2SocialLoginModule } from 'angular2-social-login';
import { AgmCoreModule } from '@agm/core';
import { MdlModule } from '@angular-mdl/core';

import { AppComponent } from './app.component';
import { AppState, InternalStateType } from './app.service';
import { GlobalState } from './global.state';
import { routing } from './app.routing';
import { AppConfig } from './app.config';
import { NgaModule } from './navigation/nga.module';
import { NgUploaderModule, NgFileSelectDirective } from 'ngx-uploader';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService } from './_services';
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
import { FieldsCreatorComponent } from './forms/fieldCreator/fieldCreator.component';
import { FormsCreatorComponent } from './forms/formsCreator/formsCreator.component';
import { DynamicFormModule } from './components/dynamic-form/dynamic-form.module';
import { FieldsRemoverComponent } from './forms/fieldsRemover/fieldsRemover.component';
import { FormCheckboxComponent } from './components/dynamic-form/components/form-checkbox/form-checkbox.component';
import { DashboardWidgetComponent } from './pages/dashboard/dashboard-widget.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {
    MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatOptionModule,
    MatSelectModule
} from '@angular/material';
import { GoogleCalendarService } from './_services/googleCalendar.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorNotificationInterceptor } from './_helpers/error-notification-interceptor';

const socialProviders = {
    google: {
        clientId: '105867542127-fhj8fusdb13mm0jp2t6dfif1j56pjvaj.apps.googleusercontent.com'
    }
};

const APP_PROVIDERS = [
    AppState,
    GlobalState
];

export function createTranslateLoader(http: Http) {
    return new TranslateHttpLoader(http, 'src/assets/i18n/', '.json');
}

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        routing,
        Angular2SocialLoginModule,
        PagesModule,
        NgaModule.forRoot(),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyAVY4MA8FBzN8gFd1v0cF-RAOcdwukvJKQ'
        }),
        MdlModule,
        DynamicFormModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [Http]
            }
        }),
        MatSelectModule,
        MatOptionModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
        WelcomeComponent,
        RegisterComponent,
        ForgotPasswordComponent,
        PersonalDetailsFormComponent,
        InlineEditComponent
    ],
    providers: [
        AppConfig,
        AuthGuard,
        AuthenticationService,
        GoogleCalendarService,
        UserService,
        AlertService,
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        APP_PROVIDERS,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorNotificationInterceptor,
            multi: true,
        }
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
}

Angular2SocialLoginModule.loadProvidersScripts(socialProviders);

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
