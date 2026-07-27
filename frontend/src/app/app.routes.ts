import { Routes } from '@angular/router';
import { Landing } from './landing';
import { Cotizar } from './cotizar';

// La ruta /nosotros está pausada: la página existe (nosotros.ts/.html/.scss)
// pero el equipo aún es data de ejemplo. Se re-agrega cuando haya datos reales.
export const routes: Routes = [
  { path: '', component: Landing },
  { path: 'cotizar', component: Cotizar },
  { path: '**', redirectTo: '' }
];
