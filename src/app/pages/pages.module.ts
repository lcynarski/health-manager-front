import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routing } from './pages.routing';
import { NgaModule } from '../navigation/nga.module';
// import { AppTranslationModule } from '../app.translation.module';

import { Pages } from './pages.component';

@NgModule({
    imports: [CommonModule, NgaModule, routing],
    declarations: [Pages]
})
export class PagesModule {
}
