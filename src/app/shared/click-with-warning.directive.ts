import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appClickWithWarning]'
})
export class ClickWithWarningDirective {
  @Input() warning = 'Sure?';
  @Output('appClickWithWarning') buttonClick = new EventEmitter<void>();

  @HostBinding('class') myClass = 'btn btn-danger';

  constructor(private elm: ElementRef) {
    console.log('elm', elm);
    // elm.nativeElement.addEventListener(...)
    // elm.nativeElementelm.class = 'btn btn-default'
  }

  @HostListener('click', ['$event'])
  handleClick(event: MouseEvent): void {
    if (event.shiftKey || confirm(this.warning)) {
      this.buttonClick.emit();
    }
  }
}
