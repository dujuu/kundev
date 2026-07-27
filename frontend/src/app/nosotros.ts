import { Component, HostListener, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealOnScrollDirective } from './reveal-on-scroll.directive';
import { TeamMemberCard } from './team-member-card';
import type { TeamMember } from './team-member.model';

@Component({
  selector: 'app-nosotros',
  imports: [RouterLink, RevealOnScrollDirective, TeamMemberCard],
  templateUrl: './nosotros.html',
  styleUrl: './nosotros.scss'
})
export class Nosotros {
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

  team: TeamMember[] = [
    { name: 'Nombre Apellido', role: 'Fundador · Desarrollo', initials: 'NA' },
    { name: 'Nombre Apellido', role: 'Diseño · Producto', initials: 'NA' },
    { name: 'Nombre Apellido', role: 'Desarrollo · Infraestructura', initials: 'NA' }
  ];
}
