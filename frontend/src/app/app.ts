import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { RevealOnScrollDirective } from './reveal-on-scroll.directive';
import { SpotlightDirective } from './spotlight.directive';

interface HeroCopy {
  title: string;
  subtitle: string;
  primaryCta: string;
}

const ARICA_TIME_ZONE = 'America/Santiago';

@Component({
  selector: 'app-root',
  imports: [RevealOnScrollDirective, SpotlightDirective],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, OnDestroy {
  currentYear = new Date().getFullYear();
  localTime = signal(this.formatLocalTime());

  private timeIntervalId?: ReturnType<typeof setInterval>;

  heroCopy: HeroCopy = {
      title: 'Soluciones digitales de alto nivel.',
      subtitle: 'Ayudamos a pymes, comercios locales e instituciones a modernizar sus procesos mediante sitios web profesionales, sistemas de gestión y aplicaciones conectadas al ecosistema digital actual.',
      primaryCta: 'Comenzar un proyecto'
  };

  ngOnInit(): void {
    this.timeIntervalId = setInterval(() => {
      this.localTime.set(this.formatLocalTime());
    }, 30_000);
  }

  ngOnDestroy(): void {
    clearInterval(this.timeIntervalId);
  }

  private formatLocalTime(): string {
    return new Intl.DateTimeFormat('es-CL', {
      timeZone: ARICA_TIME_ZONE,
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date());
  }
}
