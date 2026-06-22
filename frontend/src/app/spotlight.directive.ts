import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[appSpotlight]',
  host: {
    class: 'spotlight',
  },
})
export class SpotlightDirective {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    const rect = this.elementRef.nativeElement.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    this.elementRef.nativeElement.style.setProperty('--spot-x', `${x}%`);
    this.elementRef.nativeElement.style.setProperty('--spot-y', `${y}%`);
  }
}
