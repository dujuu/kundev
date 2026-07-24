import { Directive, ElementRef, Input, OnDestroy, OnInit, inject } from '@angular/core';

@Directive({
  selector: '[appParallax]',
})
export class ParallaxDirective implements OnInit, OnDestroy {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  @Input('appParallax') strength = 0.15;

  private ticking = false;
  private readonly onScroll = (): void => {
    if (this.ticking) {
      return;
    }
    this.ticking = true;
    requestAnimationFrame(() => {
      const rect = this.elementRef.nativeElement.getBoundingClientRect();
      const offset = (window.innerHeight / 2 - (rect.top + rect.height / 2)) * this.strength;
      this.elementRef.nativeElement.style.setProperty('--parallax-y', `${offset}px`);
      this.ticking = false;
    });
  };

  ngOnInit(): void {
    window.addEventListener('scroll', this.onScroll, { passive: true });
    this.onScroll();
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.onScroll);
  }
}
