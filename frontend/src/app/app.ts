import { Component } from '@angular/core';

interface HeroCopy {
  title: string;
  subtitle: string;
  primaryCta: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  currentYear = new Date().getFullYear();

  heroCopy: HeroCopy = {
      title: 'Soluciones digitales de alto nivel.',
      subtitle: 'Ayudamos a pymes, comercios locales e instituciones a modernizar sus procesos mediante sitios web profesionales, sistemas de gestión y aplicaciones conectadas al ecosistema digital actual.',
      primaryCta: 'Comenzar un proyecto'
  };
}
