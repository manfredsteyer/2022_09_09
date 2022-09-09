// src/app/shared/shared.module.ts

import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateComponent } from './date/date.component';
import { CityPipe } from './city.pipe';
import { StatusColorPipe } from './status-color.pipe';
import { StatusFilterPipe } from './status-filter.pipe';
import { FormsModule } from '@angular/forms';

// Von der CLI eingefügt
import { CityValidationDirective } from './validation/city-validation.directive';
import { TabComponent } from './tab/tab.component';
import { TabbedPaneComponent } from './tabbed-pane/tabbed-pane.component';
import { TabPagerComponent } from './tab-pager/tab-pager.component';
import { BadComponent } from './bad/bad.component';
import { ClickWithWarningDirective } from './click-with-warning.directive';
import { ToolTipDirective } from './tool-tip.directive';
import { LazyComponent } from './lazy/lazy.component';
import { DataTableComponent } from './data-table/data-table.component';
import { TableFieldDirective } from './table-field.directive';
import { AuthService } from './auth/auth.service';
import { DateCvaDirective } from './date-cva';

@NgModule({
  imports: [CommonModule, FormsModule],
  providers: [],
  declarations: [
    DateComponent,
    CityPipe,
    StatusColorPipe,
    StatusFilterPipe,

    // Von der CLI eingefügt
    CityValidationDirective,
    TabComponent,
    TabbedPaneComponent,
    TabPagerComponent,
    BadComponent,
    ClickWithWarningDirective,
    ToolTipDirective,
    DataTableComponent,
    TableFieldDirective,
    DateCvaDirective
  ],
  exports: [
    DateComponent,
    CityPipe,
    StatusColorPipe,
    StatusFilterPipe,
    FormsModule,
    CommonModule,

    // Neue Einträge
    CityValidationDirective,
    TabComponent,
    TabbedPaneComponent,
    TabPagerComponent,
    BadComponent,
    ClickWithWarningDirective,
    ToolTipDirective,
    DataTableComponent,
    TableFieldDirective,

    DateCvaDirective
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [AuthService]
    };
  }
}
