import { Component, OnDestroy, OnInit } from '@angular/core';
import { ScheduledProcedure } from '../../_models/medcom/scheduledProcedure';
import { ScheduledProceduresService, ModalitiesService } from '../../_services/medcom';


@Component({
    selector: 'procedures-schedule',
    templateUrl: 'procedures-schedule.component.html',
    styleUrls: ['procedures-schedule.component.scss']
})
export class ProceduresScheduleComponent implements OnInit, OnDestroy {

    procedures: ScheduledProcedure[];

    constructor(private scheduledProceduresService: ScheduledProceduresService,
                public modalitiesService: ModalitiesService) {}

    public ngOnInit() {
        this.scheduledProceduresService.getMockSchedule()
            .subscribe(
                ((procedures: ScheduledProcedure[]) => {
                    this.procedures = procedures
                        .sort((p1, p2) => (p1.date < p2.date) ? 1 : -1);
                })
            );
    }

    public ngOnDestroy() {}

}
