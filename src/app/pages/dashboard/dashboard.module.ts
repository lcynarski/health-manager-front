import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { AppTranslationModule } from '../../app.translation.module';
// import { NgaModule } from '../../theme/nga.module';

import { DashboardComponent } from './dashboard.component';
import { routing } from './dashboard.routing';
import { NgaModule } from '../../navigation/nga.module';
import { MdlModule } from '@angular-mdl/core';
import { ChangePasswordComponent } from '../../change-password/index';
import { DashboardWidgetComponent } from './dashboard-widget.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgaModule,
        routing,
        MdlModule,
        TranslateModule
    ],
    declarations: [
        DashboardComponent,
        DashboardWidgetComponent
    ],
    providers: []
})
export class DashboardModule {
}
