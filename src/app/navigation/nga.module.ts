import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// import { NgUploaderModule } from 'ngx-uploader';
// import { AppTranslationModule } from '../app.translation.module';

// import {
//     BaThemeConfig
// } from './theme.config';
//
// import {
//     BaThemeConfigProvider
// } from './theme.configProvider';

import {
    Sidebar,
    PageTop,
    Menu,
    MenuItem
} from './components';

// import { BaCardBlur } from './components/baCard/baCardBlur.directive';

// import {
//     BaScrollPosition,
//     BaSlimScroll,
//     BaThemeRun
// } from './directives';
//
// import {
//     BaAppPicturePipe,
//     BaKameleonPicturePipe,
//     BaProfilePicturePipe
// } from './pipes';
//
import {
//     BaImageLoaderService,
    MenuService,
//     BaThemePreloader,
//     BaThemeSpinner
} from './services';
//
// import {
//     EmailValidator,
//     EqualPasswordsValidator
// } from './validators';

const NGA_COMPONENTS = [
    Sidebar,
    PageTop,
    Menu,
    MenuItem
];

// const NGA_DIRECTIVES = [
//     BaScrollPosition,
//     BaSlimScroll,
//     BaThemeRun,
//     BaCardBlur
// ];
//
// const NGA_PIPES = [
//     BaAppPicturePipe,
//     BaKameleonPicturePipe,
//     BaProfilePicturePipe
// ];
//
const NGA_SERVICES = [
//     BaImageLoaderService,
//     BaThemePreloader,
//     BaThemeSpinner,
    MenuService
];
//
// const NGA_VALIDATORS = [
//     EmailValidator,
//     EqualPasswordsValidator
// ];

@NgModule({
    declarations: [
        // ...NGA_PIPES,
        // ...NGA_DIRECTIVES,
        ...NGA_COMPONENTS
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        // ...NGA_PIPES,
        // ...NGA_DIRECTIVES,
        ...NGA_COMPONENTS
    ]
})
export class NgaModule {
    static forRoot(): ModuleWithProviders {
        return <ModuleWithProviders> {
            ngModule: NgaModule,
            providers: [
                // BaThemeConfigProvider,
                // BaThemeConfig,
                // ...NGA_VALIDATORS,
                ...NGA_SERVICES
            ],
        };
    }
}
