import { Directive, ElementRef, OnDestroy, OnInit, inject } from '@angular/core';

/**
 * Publishes how far the host has travelled through the viewport as `--scroll-progress`,
 * ramping 0 → 1 as the element rises from just below the fold to just above it.
 * Lets a section drive its own scene (sun, glow, parallax) straight from CSS.
 */
@Directive({
  selector: '[appScrollProgress]',
})
export class ScrollProgressDirective implements OnInit, OnDestroy {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  private ticking = false;

  private readonly onScroll = (): void => {
    if (this.ticking) {
      return;
    }
    this.ticking = true;
    requestAnimationFrame(() => {
      const element = this.elementRef.nativeElement;
      const rect = element.getBoundingClientRect();
      const travel = window.innerHeight + rect.height;
      const progress = travel > 0 ? (window.innerHeight - rect.top) / travel : 0;

      element.style.setProperty('--scroll-progress', `${Math.min(Math.max(progress, 0), 1)}`);
      this.ticking = false;
    });
  };

  ngOnInit(): void {
    window.addEventListener('scroll', this.onScroll, { passive: true });
    window.addEventListener('resize', this.onScroll, { passive: true });
    this.onScroll();
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onScroll);
  }
}
