import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { AboutComponent } from 'src/app/about/about.component';
import { PagerService } from '../pager.service';
import { TabPagerComponent } from '../tab-pager/tab-pager.component';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-tabbed-pane',
  templateUrl: './tabbed-pane.component.html',
  styleUrls: ['./tabbed-pane.component.scss'],
  providers: [PagerService]
})
export class TabbedPaneComponent implements /*OnInit,*/ AfterContentInit, AfterViewInit {
  // @ContentChild(TabComponent)
  // tab!: TabComponent;

  @ContentChildren(TabComponent)
  tabList!: QueryList<TabComponent>;

  @ContentChildren(TabComponent, { read: ElementRef })
  tabsAsElementRef!: QueryList<ElementRef>;

  @ContentChildren(TabComponent, { read: ViewContainerRef })
  tabsAsViewContainerRef!: QueryList<ViewContainerRef>;

  // @ContentChildren(TabComponent, { read: /*MyDirective*/ })
  // tabsAsViewContainerRef!: QueryList<TabComponent>;

  @ViewChild(TabPagerComponent)
  tabPager!: TabPagerComponent;

  //tabs: TabComponent[] = [];

  currentPage = 1;
  pageCount = 0;

  constructor(private pagerService: PagerService) {}

  get tabs(): TabComponent[] {
    return this.tabList.toArray();
  }

  activate(tab: TabComponent): void {
    for (const t of this.tabs) {
      t.show = t === tab;
    }
    this.currentPage = this.tabs.indexOf(tab) + 1;

    if (this.tabPager) {
      this.pagerService.currentPage = this.currentPage;
      this.pagerService.pageChange.next(this.currentPage);
    }
  }

  pageChange(newPage: number): void {
    const tab = this.tabs[newPage - 1];
    this.activate(tab);
  }

  ngAfterContentInit(): void {
    // console.debug('child', this.tab);

    if (this.tabs.length === 0) {
      return;
    }
    this.activate(this.tabs[0]);

    this.pageCount = this.tabs.length;

    this.tabsAsViewContainerRef.forEach((container) => {
      container.createComponent(AboutComponent);
    });

    this.tabsAsElementRef.forEach((elm) => {
      elm.nativeElement.style.color = 'green';
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.pagerService.pageCount = this.tabs.length;
    }, 0);

    this.pagerService.pageChange.subscribe((newPage) => {
      if (newPage !== this.currentPage) {
        this.pageChange(newPage);
      }
    });
  }

  // ngOnInit(): void {}

  register(tab: TabComponent): void {
    this.tabs.push(tab);
  }
}
