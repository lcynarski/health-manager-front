import { NgModule, Provider } from '@angular/core';
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
import { AuthGuard, DoctorRoleGuard } from './_guards/index';
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
    DateAdapter,
    MAT_DATE_FORMATS,
    MAT_DATE_LOCALE,
    MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatOptionModule,
    MatSelectModule, MatSnackBarModule
} from '@angular/material';
import { GoogleCalendarService } from './_services/googleCalendar.service';
import { SharedModule } from './shared/shared.module';
import { SpinnerService } from './_services/shared/spinner.service';

const socialProviders = {
    google: {
        clientId: '105867542127-fhj8fusdb13mm0jp2t6dfif1j56pjvaj.apps.googleusercontent.com'
    }
};

const APP_PROVIDERS = [
    AppState,
    GlobalState
];

function createTranslateLoader(http: Http) {
    return new TranslateHttpLoader(http, 'src/assets/i18n/', '.json');
}

export const translateLoader: Provider = {
    provide: TranslateLoader,
    useFactory: (createTranslateLoader),
    deps: [Http]
};

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
        MdlModule,
        DynamicFormModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot({
            loader: translateLoader
        }),
        MatSelectModule,
        MatOptionModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatSnackBarModule,
        SharedModule,
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
        DoctorRoleGuard,
        AuthenticationService,
        GoogleCalendarService,
        UserService,
        AlertService,
        SpinnerService,
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        APP_PROVIDERS,
        {provide: MAT_DATE_LOCALE, useValue: 'en-EN'},
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
}

Angular2SocialLoginModule.loadProvidersScripts(socialProviders);
