import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[appMouseParallax]',
})
export class MouseParallaxDirective {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private ticking = false;

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.ticking) {
      return;
    }
    this.ticking = true;
    requestAnimationFrame(() => {
      const rect = this.elementRef.nativeElement.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      this.elementRef.nativeElement.style.setProperty('--mouse-x', x.toFixed(3));
      this.elementRef.nativeElement.style.setProperty('--mouse-y', y.toFixed(3));
      this.ticking = false;
    });
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.elementRef.nativeElement.style.setProperty('--mouse-x', '0');
    this.elementRef.nativeElement.style.setProperty('--mouse-y', '0');
  }
}
