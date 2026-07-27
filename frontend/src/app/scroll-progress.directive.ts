import { Directive, ElementRef, OnDestroy, OnInit, inject } from '@angular/core';

/**
 * Publishes how far the host has travelled through the viewport as `--scroll-progress`,
 * ramping 0 → 1 as the element rises from just below the fold to just above it.
 * Lets a section drive its own scene (sun, glow, parallax) straight from CSS.
 *
 * The scroll listener is only attached while the host is near the viewport
 * (via IntersectionObserver). Without this, a section placed low on the page —
 * this one is the closing CTA — would still pay for a rect read and a style
 * write on every scroll frame for the entire page, including the long stretch
 * before it's anywhere near visible. That's the difference between "the sun
 * animates" and "scrolling the whole page feels heavier on a phone."
 */
@Directive({
  selector: '[appScrollProgress]',
})
export class ScrollProgressDirective implements OnInit, OnDestroy {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  private ticking = false;
  private listening = false;
  private intersectionObserver?: IntersectionObserver;

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
    if (typeof IntersectionObserver === 'undefined') {
      this.startListening();
      return;
    }

    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        const nearby = entries.some((entry) => entry.isIntersecting);
        if (nearby) {
          this.startListening();
        } else {
          this.stopListening();
        }
      },
      { rootMargin: '50% 0px' },
    );
    this.intersectionObserver.observe(this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.intersectionObserver?.disconnect();
    this.stopListening();
  }

  private startListening(): void {
    if (this.listening) {
      return;
    }
    this.listening = true;
    window.addEventListener('scroll', this.onScroll, { passive: true });
    window.addEventListener('resize', this.onScroll, { passive: true });
    this.onScroll();
  }

  private stopListening(): void {
    if (!this.listening) {
      return;
    }
    this.listening = false;
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onScroll);
  }
}
