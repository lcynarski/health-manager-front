"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var app_component_1 = require("./app.component");
var app_routing_1 = require("./app.routing");
var app_config_1 = require("./app.config");
var index_1 = require("./_directives/index");
var index_2 = require("./_guards/index");
var index_3 = require("./_services/index");
var index_4 = require("./login/index");
var index_5 = require("./home/index");
var index_6 = require("./welcome/index");
var index_7 = require("./register/index");
var common_1 = require("@angular/common");
var index_8 = require("./medcom/index");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            app_routing_1.routing
        ],
        declarations: [
            app_component_1.AppComponent,
            index_4.LoginComponent,
            index_5.HomeComponent,
            index_6.WelcomeComponent,
            index_7.RegisterComponent,
            index_1.AlertComponent,
            index_8.MedcomComponent
        ],
        providers: [
            app_config_1.AppConfig,
            index_2.AuthGuard,
            index_3.AuthenticationService,
            index_3.UserService,
            index_3.AlertService,
            index_3.MedcomService,
            { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy }
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
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
//# sourceMappingURL=app.module.js.map