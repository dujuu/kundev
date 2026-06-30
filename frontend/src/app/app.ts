import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
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
export class App implements OnInit, OnDestroy, AfterViewInit {
  currentYear = new Date().getFullYear();
  localTime = signal(this.formatLocalTime());

  private timeIntervalId?: ReturnType<typeof setInterval>;

  @ViewChild('heroWrapper')  private heroWrapper!:  ElementRef<HTMLDivElement>;
  @ViewChild('heroSky')      private heroSky!:      ElementRef<SVGElement>;
  @ViewChild('flyingCondor') private flyingCondor!: ElementRef<SVGElement>;
  @ViewChild('heroContent')  private heroContent!:  ElementRef<HTMLDivElement>;
  @ViewChild('heroTagline2') private heroTagline2!: ElementRef<HTMLDivElement>;
  @ViewChild('scrollHint')   private scrollHint!:   ElementRef<HTMLDivElement>;

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

  ngAfterViewInit(): void {
    this.updateHeroScroll();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.updateHeroScroll();
  }

  private updateHeroScroll(): void {
    const rect        = this.heroWrapper.nativeElement.getBoundingClientRect();
    const scrollSpace = this.heroWrapper.nativeElement.offsetHeight - window.innerHeight;
    const p           = Math.min(1, Math.max(0, -rect.top / scrollSpace));

    this.heroSky.nativeElement.style.opacity = String(p);

    const condorOpacity = Math.max(0, (p - 0.08) / 0.92);
    const condorScale   = this.lerp(0.3, 1.8, p);
    const condorTop     = this.lerp(22, 54, p);
    this.flyingCondor.nativeElement.style.opacity   = String(condorOpacity);
    this.flyingCondor.nativeElement.style.top       = condorTop + '%';
    this.flyingCondor.nativeElement.style.transform = `translate(-50%, -50%) scale(${condorScale})`;

    this.heroContent.nativeElement.style.opacity   = String(Math.max(0, 1 - p * 2.2));
    this.heroContent.nativeElement.style.transform = `translateY(${-p * 40}px)`;

    this.heroTagline2.nativeElement.style.opacity   = String(Math.max(0, (p - 0.5) / 0.5));
    this.heroTagline2.nativeElement.style.transform = `translate(-50%, calc(-50% + ${(1 - p) * 40}px))`;

    this.scrollHint.nativeElement.style.opacity = String(Math.max(0, 1 - p * 5));
  }

  private lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
  }

  private formatLocalTime(): string {
    return new Intl.DateTimeFormat('es-CL', {
      timeZone: ARICA_TIME_ZONE,
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date());
  }
}
