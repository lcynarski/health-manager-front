// import { Component, EventEmitter, Input, Output } from '@angular/core';
// import { OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
// import { Renderer, ElementRef, ViewChild } from '@angular/core';
//
// @Component({
//     selector: 'virtual-scroll',
//     template: `
//         <div class="total-padding" [style.height]="scrollHeight + 'px'"></div>
//         <div class="scrollable-content" #content [style.transform]="'translateY(' + topPadding + 'px)'">
//             <ng-content></ng-content>
//         </div>
//     `,
//     styles: [`
//         :host {
//             overflow: hidden;
//             overflow-y: auto;
//             position: relative;
//         }
//         .scrollable-content {
//             top: 0;
//             left: 0;
//             width: 100%;
//             height: 100%;
//             position: absolute;
//         }
//         .total-padding {
//             width: 1px;
//             opacity: 0;
//         }
//     `]
// })
// export class VirtualScrollComponent implements OnInit {
//
//     @Input()
//     items: any[] = [];
//
//     @Input()
//     childWidth: number;
//
//     @Input()
//     childHeight: number;
//
//     @Output()
//     update: EventEmitter<any[]> = new EventEmitter<any[]>();
//
//     @Output()
//     change: EventEmitter<ChangeEvent> = new EventEmitter<ChangeEvent>();
//
//     @ViewChild('content', { read: ElementRef })
//     protected contentElementRef: ElementRef;
//
//     protected scrollHeight: number;
//     protected topPadding: number;
//
//     constructor(private element: ElementRef, private renderer: Renderer) {  }
//
//     ngOnInit() {
//         this.renderer.listen(this.element.nativeElement, 'scroll', this.refresh.bind(this));
//     }
//
//     refresh() {
//         // to be sure not to block ui thread, using requestAnimationFrame
//         requestAnimationFrame(this.calculateItems.bind(this));
//     }
//
//     private calculateDimensions() {
//         let el = this.element.nativeElement;
//         let content = this.contentElementRef.nativeElement;
//
//         let items = this.items || [];
//         let itemCount = items.length;
//         let viewWidth = el.clientWidth - this.scrollbarWidth;
//         let viewHeight = el.clientHeight - this.scrollbarHeight;
//
//         let contentDimensions;
//         if (this.childWidth == undefined || this.childHeight == undefined) {
//             contentDimensions = content.children[0] ? content.children[0].getBoundingClientRect() : {
//                 width: viewWidth,
//                 height: viewHeight
//             };
//         }
//         let childWidth = this.childWidth || contentDimensions.width;
//         let childHeight = this.childHeight || contentDimensions.height;
//
//         let itemsPerRow = Math.max(1, Math.floor(viewWidth / childWidth));
//
//         return {
//             itemCount: itemCount,
//             viewWidth: viewWidth,
//             viewHeight: viewHeight,
//             childWidth: childWidth,
//             childHeight: childHeight,
//             itemsPerRow: itemsPerRow
//         };
//     }
//
//     private calculateItems() {
//         let d = this.calculateDimensions();
//         let start = Math.floor(d.scrollTop / d.scrollHeight * d.itemCount / d.itemsPerRow) * d.itemsPerRow;
//         let end = start + d.viewHeight / d.childHeight * d.itemsPerRow;
//
//         this.scrollHeight = d.childHeight * d.itemCount / d.itemsPerRow ;
//         this.topPadding = d.childHeight * start / d.itemsPerRow;
//
//         // emit update event
//         this.update.emit(this.items.slice(start, end));
//
//         // emit change event
//         this.change.emit({
//             start: start,
//             end: end
//         });
//     }
// }