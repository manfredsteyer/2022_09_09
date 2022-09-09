import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class PagerService {
  pageCount = 0;
  currentPage = 1;

  pageChange = new Subject<number>();
}
