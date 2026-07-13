import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealOnScrollDirective } from './reveal-on-scroll.directive';
import { SpotlightDirective } from './spotlight.directive';

interface HeroCopy {
  title: string;
  subtitle: string;
  primaryCta: string;
}

@Component({
  selector: 'app-landing',
  imports: [RouterLink, RevealOnScrollDirective, SpotlightDirective],
  templateUrl: './landing.html',
  styleUrl: './landing.scss'
})
export class Landing {
  currentYear = new Date().getFullYear();
  menuOpen = signal(false);

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
