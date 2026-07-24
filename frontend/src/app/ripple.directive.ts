import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[appRipple]',
  host: {
    class: 'ripple-host',
  },
})
export class RippleDirective {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    const host = this.elementRef.nativeElement;
    const rect = host.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;

    const ripple = document.createElement('span');
    ripple.className = 'ripple-effect';
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${event.clientY - rect.top - size / 2}px`;

    host.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  }
}
