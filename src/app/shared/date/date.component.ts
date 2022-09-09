import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

// <app-date [(data)]="myDate">
// <app-date [(ngModel)]="myDate">
// <app-date forControlName="myDate">

type OnChangeCallback = (value: string) => void;
type OnTouchedCallback = () => void;

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss']
})
export class DateComponent implements OnInit, OnChanges, ControlValueAccessor {
  @Input() date: string | null = null;
  @Output() dateChange = new EventEmitter<string>();

  day: number | null = null;
  month: number | null = null;
  year: number | null = null;
  hour: number | null = null;
  minute: number | null = null;

  constructor(control: NgControl) {
    control.valueAccessor = this;
    console.debug('date in constructor', this.date);
  }

  onChange: OnChangeCallback = () => null;
  onTouched: OnTouchedCallback = () => null;

  writeValue(dateStr: string): void {
    if (!dateStr) {
      return;
    }

    const date = new Date(dateStr);
    this.day = date.getDate();
    this.month = date.getMonth() + 1;
    this.year = date.getFullYear();
    this.hour = date.getHours();
    this.minute = date.getMinutes();
  }

  registerOnChange(fn: OnChangeCallback): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: OnTouchedCallback): void {
    this.onTouched = fn;
  }

  ngOnInit() {
    console.debug('date in ngOnInit', this.date);
  }

  ngOnChanges() {
    console.debug('date in ngOnChanges', this.date);

    if (!this.date) {
      return;
    }

    const date = new Date(this.date);
    this.day = date.getDate();
    this.month = date.getMonth() + 1;
    this.year = date.getFullYear();
    this.hour = date.getHours();
    this.minute = date.getMinutes();
  }

  apply() {
    if (!this.year || !this.month || !this.day || !this.hour || !this.minute) {
      return;
    }

    const date = new Date(this.year, this.month - 1, this.day, this.hour, this.minute);
    this.dateChange.next(date.toISOString());

    this.onChange(date.toISOString());
  }
}
