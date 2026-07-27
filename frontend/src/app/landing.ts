import { Component, HostListener, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealOnScrollDirective } from './reveal-on-scroll.directive';
import { SpotlightDirective } from './spotlight.directive';
import { RippleDirective } from './ripple.directive';
import { ParallaxDirective } from './parallax.directive';
import { MagneticDirective } from './magnetic.directive';
import { TiltDirective } from './tilt.directive';
import { MouseParallaxDirective } from './mouse-parallax.directive';
import { ScrollProgressDirective } from './scroll-progress.directive';

interface HeroCopy {
  title: string;
  subtitle: string;
  primaryCta: string;
}

interface FaqItem {
  number: string;
  category: string;
  question: string;
  answer: string;
  tags: string[];
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
    ScrollProgressDirective,
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

  activeFaq = signal(0);

  faqs: FaqItem[] = [
    {
      number: '01',
      category: 'Presupuesto',
      question: '¿Cuánto cuesta un proyecto?',
      answer: 'Depende del alcance, así que cada proyecto se cotiza a medida. La primera conversación es gratis y sin compromiso: entendemos qué necesita y le entregamos una propuesta clara con el precio antes de empezar. Sin sorpresas.',
      tags: ['Cotización gratis', 'Sin sorpresas'],
    },
    {
      number: '02',
      category: 'Plazos',
      question: '¿Cuánto se demora?',
      answer: 'Definimos plazos concretos antes de partir. Un sitio profesional suele estar listo en pocas semanas; los sistemas a medida toman más según su complejidad. Siempre sabrá en qué etapa vamos.',
      tags: ['Semanas, no meses', 'Plazos claros'],
    },
    {
      number: '03',
      category: 'Alcance',
      question: '¿Y si no sé exactamente qué necesito?',
      answer: 'Perfecto, para eso conversamos. Muchos clientes llegan con una idea o un problema, no con una especificación. La ayudamos a ordenarla y proponemos el camino más simple para resolverlo.',
      tags: ['Sin spec previa', 'Acompañamiento'],
    },
    {
      number: '04',
      category: 'Cobertura',
      question: '¿Trabajan con empresas fuera de Arica?',
      answer: 'Sí. Trabajamos de forma remota con clientes de todo Chile. La base está en Arica, pero la distancia no es un límite para acompañarle.',
      tags: ['100% remoto', 'Todo Chile'],
    },
    {
      number: '05',
      category: 'Soporte',
      question: '¿Qué pasa después de lanzar?',
      answer: 'No desaparecemos al entregar. Acompañamos la puesta en marcha, medimos resultados y seguimos mejorando el producto en el tiempo según lo que vaya necesitando.',
      tags: ['Post-lanzamiento', 'Mejora continua'],
    },
  ];

  setActiveFaq(index: number): void {
    this.activeFaq.set(index);
  }
}
