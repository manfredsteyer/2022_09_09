import { Directive, ElementRef, forwardRef, HostBinding, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

type OnChangeCallback = (value: string) => void;
type OnTouchedCallback = () => void;

@Directive({
  selector: '[appDate]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DateCvaDirective,
      multi: true
    }
  ]
})
export class DateCvaDirective implements ControlValueAccessor {
  @HostBinding('value')
  value!: string;

  @HostListener('change', ['$event'])
  change($event: any) {
    console.log('change');
    // parse!
    const value = $event.target.value as string;
    const parts = value.split('.');
    const date = new Date(parseInt(parts[2], 10), parseInt(parts[1], 10) - 1, parseInt(parts[0], 10), 2, 0, 0);
    this.onChange(date.toISOString());
  }

  @HostListener('focus', ['$event'])
  focus($event: any) {
    this.onTouched();
  }

  onChange: OnChangeCallback = () => null;
  onTouched: OnTouchedCallback = () => null;

  //   constructor(private elm: ElementRef) {}

  registerOnChange(fn: OnChangeCallback): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: OnTouchedCallback): void {
    this.onTouched = fn;
  }

  writeValue(obj: string): void {
    // Format
    console.log('obj', obj);
    const date = new Date(obj);
    this.value = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  }
}
