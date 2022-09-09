import { Directive, EmbeddedViewRef, HostListener, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appToolTip]'
})
export class ToolTipDirective implements OnInit {
  @Input('appToolTip') tmpl!: TemplateRef<{
    helpLink: string;
    $implicit: string;
  }>;

  private viewRef!: EmbeddedViewRef<{
    helpLink: string;
    $implicit: string;
  }>;

  constructor(private viewContainer: ViewContainerRef) {}

  @HostListener('mouseover')
  private mouseOver() {
    this.show();
  }

  @HostListener('mouseout')
  private mouseOut() {
    this.hide();
  }

  async ngOnInit() {
    const esm = await import('./lazy/lazy.component');
    const myComp = esm.LazyComponent;

    const compRef = this.viewContainer.createComponent(myComp);
    // compRef.instance.title = 'Servus!';

    this.viewRef = this.viewContainer.createEmbeddedView(this.tmpl, {
      $implicit: 'Super ToolTipText!',
      helpLink: 'http://www.google.de'
    });

    this.hide();
  }

  private hide() {
    this.viewRef.rootNodes.forEach((elm) => {
      elm.hidden = true;
    });
  }

  private show() {
    this.viewRef.rootNodes.forEach((elm) => {
      elm.hidden = false;
    });
  }
}
