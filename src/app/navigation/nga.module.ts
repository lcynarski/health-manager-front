import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
    SidebarComponent,
    PageTopComponent,
    MenuComponent,
    MenuItemComponent
} from './components';
import { MenuService } from './services';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule, MatIconModule, MatMenuModule } from '@angular/material';
import { MdlTooltipModule } from '@angular-mdl/core';

const NGA_COMPONENTS = [
    SidebarComponent,
    PageTopComponent,
    MenuComponent,
    MenuItemComponent
];

const NGA_SERVICES = [
    MenuService
];

@NgModule({
    declarations: [
        ...NGA_COMPONENTS
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        MatMenuModule,
        MatButtonModule,
        MatIconModule,
        MdlTooltipModule
    ],
    exports: [
        ...NGA_COMPONENTS
    ]
})
export class NgaModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: NgaModule,
            providers: [
                ...NGA_SERVICES
            ],
        } as ModuleWithProviders;
    }
}
