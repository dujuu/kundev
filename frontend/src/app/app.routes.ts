import { Routes } from '@angular/router';
import { Landing } from './landing';
import { Cotizar } from './cotizar';

export const routes: Routes = [
  { path: '', component: Landing },
  { path: 'cotizar', component: Cotizar },
  { path: '**', redirectTo: '' }
];
