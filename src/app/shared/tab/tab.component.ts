import { Component, Input, OnInit, Optional } from '@angular/core';
import { TabbedPaneComponent } from '../tabbed-pane/tabbed-pane.component';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {
  @Input() title = '';
  show = true;

  // constructor(@Optional() private pane: TabbedPaneComponent) {}

  ngOnInit(): void {
    // this.pane?.register(this);
  }
}
