import { DOCUMENT } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';

type HeroCopyVariant = 'aggressive' | 'consultive';

interface HeroCopy {
  title: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);
  private readonly cycleDurationMs = 9000;
  private animationCycle = 0;
  private typoTimeoutIds: number[] = [];

  heroCopyVariant: HeroCopyVariant = this.getHeroCopyVariantFromUrl();
  readonly typingActive = signal(true);
  readonly stabilityText = signal('production-ready');
  readonly stabilityTypoActive = signal(false);

  private readonly heroCopies: Record<HeroCopyVariant, HeroCopy> = {
    aggressive: {
      title: 'Software a medida para operaciones que <em>no pueden detenerse</em>.',
      subtitle: 'Diseñamos y desarrollamos sistemas, APIs e integraciones críticas para que tu operación funcione estable, con menor carga operativa y más control técnico.',
      primaryCta: 'Hablar ahora por WhatsApp',
      secondaryCta: 'Solicitar diagnóstico técnico'
    },
    consultive: {
      title: 'Tomamos tu problema técnico y lo convertimos en un <em>plan ejecutable</em>.',
      subtitle: 'Analizamos tu operación, priorizamos riesgos y construimos soluciones a medida con foco en continuidad, escalabilidad y resultados medibles.',
      primaryCta: 'Conversar por WhatsApp',
      secondaryCta: 'Agendar diagnóstico técnico'
    }
  };

  get heroCopy(): HeroCopy {
    return this.heroCopies[this.heroCopyVariant];
  }

  constructor() {
    const browserWindow = this.document.defaultView;

    if (!browserWindow) {
      return;
    }

    const clearTypoTimers = () => {
      for (const timeoutId of this.typoTimeoutIds) {
        browserWindow.clearTimeout(timeoutId);
      }

      this.typoTimeoutIds = [];
      this.stabilityText.set('production-ready');
      this.stabilityTypoActive.set(false);
    };

    const scheduleTypoCycle = () => {
      this.animationCycle += 1;

      if (this.animationCycle % 3 !== 0) {
        return;
      }

      const steps: Array<[number, string, boolean?]> = [
        [5650, 'production-read', true],
        [5770, 'production-rea'],
        [5890, 'production-ra'],
        [6010, 'production-r'],
        [6170, 'production-rd'],
        [6310, 'production-rad'],
        [6450, 'production-rady'],
        [7180, 'production-rad'],
        [7310, 'production-ra'],
        [7440, 'production-r'],
        [7610, 'production-re'],
        [7750, 'production-rea'],
        [7890, 'production-read'],
        [8030, 'production-ready', false]
      ];

      for (const [delay, text, typoActive] of steps) {
        const timeoutId = browserWindow.setTimeout(() => {
          this.stabilityText.set(text);

          if (typoActive !== undefined) {
            this.stabilityTypoActive.set(typoActive);
          }
        }, delay);

        this.typoTimeoutIds.push(timeoutId);
      }
    };

    scheduleTypoCycle();

    let restartTimeoutId: number | undefined;
    const restartIntervalId = browserWindow.setInterval(() => {
      clearTypoTimers();
      this.typingActive.set(false);

      if (restartTimeoutId !== undefined) {
        browserWindow.clearTimeout(restartTimeoutId);
      }

      restartTimeoutId = browserWindow.setTimeout(() => {
        this.typingActive.set(true);
        scheduleTypoCycle();
      }, 100);
    }, this.cycleDurationMs);

    this.destroyRef.onDestroy(() => {
      browserWindow.clearInterval(restartIntervalId);
      clearTypoTimers();

      if (restartTimeoutId !== undefined) {
        browserWindow.clearTimeout(restartTimeoutId);
      }
    });
  }

  private getHeroCopyVariantFromUrl(): HeroCopyVariant {
    const search = this.document.defaultView?.location.search ?? '';
    const variant = new URLSearchParams(search).get('v');

    if (variant === 'aggressive' || variant === 'consultive') {
      return variant;
    }

    return 'consultive';
  }
}
