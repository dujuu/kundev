import { Component, HostListener, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealOnScrollDirective } from './reveal-on-scroll.directive';
import { SpotlightDirective } from './spotlight.directive';
import { RippleDirective } from './ripple.directive';
import { ParallaxDirective } from './parallax.directive';
import { MagneticDirective } from './magnetic.directive';
import { TiltDirective } from './tilt.directive';
import { MouseParallaxDirective } from './mouse-parallax.directive';
import { CtaSection } from './cta-section';
import { FaqSection } from './faq-section';

interface HeroCopy {
  title: string;
  subtitle: string;
  primaryCta: string;
}


@Component({
  selector: 'app-landing',
  imports: [
    RouterLink,
    RevealOnScrollDirective,
    SpotlightDirective,
    RippleDirective,
    ParallaxDirective,
    MagneticDirective,
    TiltDirective,
    MouseParallaxDirective,
    CtaSection,
    FaqSection,
  ],
  templateUrl: './landing.html',
  styleUrl: './landing.scss'
})
export class Landing {
  currentYear = new Date().getFullYear();
  menuOpen = signal(false);
  scrolled = signal(false);

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.scrolled.set(window.scrollY > 24);
  }

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  heroCopy: HeroCopy = {
      title: 'Soluciones digitales de alto nivel',
      subtitle: 'Ayudamos a pymes, comercios locales e instituciones a modernizar sus procesos mediante sitios web profesionales, sistemas de gestión y aplicaciones conectadas al ecosistema digital actual.',
      primaryCta: 'Comenzar un proyecto'
  };
}
