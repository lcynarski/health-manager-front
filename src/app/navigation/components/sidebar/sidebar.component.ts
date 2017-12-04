import { AfterViewInit, Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { GlobalState } from '../../../global.state';

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, AfterViewInit {
    public menuHeight: number;
    public isMenuCollapsed: boolean = false;
    public isMenuShouldCollapsed: boolean = false;

    constructor(private _elementRef: ElementRef, private _state: GlobalState) {

        this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
            this.isMenuCollapsed = isCollapsed;
        });
    }

    public ngOnInit(): void {
        if (this._shouldMenuCollapse()) {
            this.menuCollapse();
        }
    }

    public ngAfterViewInit(): void {
        setTimeout(() => this.updateSidebarHeight());
    }

    @HostListener('window:resize')
    public onWindowResize(): void {

        const isMenuShouldCollapsed = this._shouldMenuCollapse();

        if (this.isMenuShouldCollapsed !== isMenuShouldCollapsed) {
            this.menuCollapseStateChange(isMenuShouldCollapsed);
        }
        this.isMenuShouldCollapsed = isMenuShouldCollapsed;
        this.updateSidebarHeight();
    }

    public menuExpand(): void {
        this.menuCollapseStateChange(false);
    }

    public menuCollapse(): void {
        this.menuCollapseStateChange(true);
    }

    public menuCollapseStateChange(isCollapsed: boolean): void {
        this.isMenuCollapsed = isCollapsed;
        this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    }

    public updateSidebarHeight(): void {
        this.menuHeight = this._elementRef.nativeElement.childNodes[0].clientHeight - 84;
    }

    private _shouldMenuCollapse(): boolean {
        return false;
    }
}
