import { Component, OnInit } from '@angular/core';
import { PagerService } from '../pager.service';

@Component({
  selector: 'app-bad',
  templateUrl: './bad.component.html',
  styleUrls: ['./bad.component.scss']
})
export class BadComponent implements OnInit {
  constructor(private pagerService: PagerService) {}

  ngOnInit(): void {
    setInterval(() => {
      this.pagerService.pageChange.next(this.pagerService.currentPage + 1);
    }, 2000);
  }
}
