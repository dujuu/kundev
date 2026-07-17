import { Routes } from '@angular/router';
import { Landing } from './landing';
import { Cotizar } from './cotizar';
import { Nosotros } from './nosotros';

export const routes: Routes = [
  { path: '', component: Landing },
  { path: 'nosotros', component: Nosotros },
  { path: 'cotizar', component: Cotizar },
  { path: '**', redirectTo: '' }
];
