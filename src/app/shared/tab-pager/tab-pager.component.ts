import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PagerService } from '../pager.service';

@Component({
  selector: 'app-tab-pager',
  templateUrl: './tab-pager.component.html',
  styleUrls: ['./tab-pager.component.scss']
})
export class TabPagerComponent {
  @Input() currentPage = this.pagerService.currentPage;

  @Output() pageChange = new EventEmitter<number>();

  constructor(private pagerService: PagerService) {
    this.pagerService.pageChange.subscribe((newValue) => {
      this.currentPage = newValue;
    });
  }

  get pageCount() {
    return this.pagerService.pageCount;
  }

  prev(): void {
    this.currentPage--;
    if (this.currentPage <= 0) {
      this.currentPage = this.pageCount;
    }
    this.pagerService.pageChange.next(this.currentPage);
  }

  next(): void {
    this.currentPage++;
    if (this.currentPage > this.pageCount) {
      this.currentPage = 1;
    }
    this.pagerService.pageChange.next(this.currentPage);
  }
}
