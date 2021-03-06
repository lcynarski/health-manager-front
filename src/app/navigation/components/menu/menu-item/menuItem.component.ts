import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'menu-item',
    templateUrl: './menuItem.component.html',
    styleUrls: ['./menuItem.component.scss']
})
export class MenuItemComponent {

    @Input() menuItem: any;
    @Input() child: boolean = false;
    @Input() userRole: string = '';

    @Output() itemHover = new EventEmitter<any>();
    @Output() toggleSubMenu = new EventEmitter<any>();

    public onHoverItem($event): void {
        this.itemHover.emit($event);
    }

    public onToggleSubMenu($event, item): boolean {
        $event.item = item;
        this.toggleSubMenu.emit($event);
        return false;
    }
}
