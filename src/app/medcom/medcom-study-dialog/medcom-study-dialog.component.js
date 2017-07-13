"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var core_2 = require("@angular-mdl/core");
var medcom_service_1 = require("../../_services/medcom.service");
exports.STUDY_INJECTION_TOKEN = new core_1.InjectionToken('studyDetails');
var MedcomStudyDialogComponent = (function () {
    function MedcomStudyDialogComponent(study, dialog, medcomService) {
        this.study = study;
        this.dialog = dialog;
        this.medcomService = medcomService;
        if (study.series.length) {
            this.onSeriesChange({ index: 0 });
        }
    }
    MedcomStudyDialogComponent.prototype.onSeriesChange = function (_a) {
        var index = _a.index;
        console.log('series changed to ' + index);
        var series = this.study.series[index];
        this.instanceUrl = this.medcomService.getInstanceUrl(this.study, series);
    };
    MedcomStudyDialogComponent.prototype.onEsc = function () {
        console.log('on esc');
        this.dialog.hide();
    };
    return MedcomStudyDialogComponent;
}());
__decorate([
    core_1.HostListener('keydown.esc'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MedcomStudyDialogComponent.prototype, "onEsc", null);
MedcomStudyDialogComponent = __decorate([
    core_1.Component({
        selector: 'study-dialog',
        templateUrl: 'medcom-study-dialog.component.html',
        styleUrls: ['medcom-study-dialog.component.scss'],
        encapsulation: core_1.ViewEncapsulation.None,
    }),
    __param(0, core_1.Inject(exports.STUDY_INJECTION_TOKEN)),
    __metadata("design:paramtypes", [Object, core_2.MdlDialogReference,
        medcom_service_1.MedcomService])
], MedcomStudyDialogComponent);
exports.MedcomStudyDialogComponent = MedcomStudyDialogComponent;
