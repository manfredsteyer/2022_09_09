import { Directive, Input, TemplateRef } from '@angular/core';

// <div *appTableField="let data as 'id'>{{data}}</div>
//                               --
//                                |---> [appTableFieldAs]="'id'"
@Directive({
  selector: '[appTableField]'
})
export class TableFieldDirective {
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('appTableFieldAs') propName = ''; // id, from, to, date ...

  constructor(public templateRef: TemplateRef<unknown>) {}
}
