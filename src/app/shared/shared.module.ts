import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MdlModule } from '@angular-mdl/core';
import { SpinnerComponent } from './spinner/spinner.component';


@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        MdlModule,
    ],
    declarations: [
        SpinnerComponent,
    ],
    exports: [
        SpinnerComponent,
    ]
})
export class SharedModule {
}
