import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabPagerComponent } from './tab-pager.component';

describe('TabPagerComponent', () => {
  let component: TabPagerComponent;
  let fixture: ComponentFixture<TabPagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabPagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabPagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
