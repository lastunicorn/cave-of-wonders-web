import { Routes } from '@angular/router';
import { PotList } from './components/pot-list/pot-list';
import { Home } from './components/home/home';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'pots', component: PotList },
  { path: '**', redirectTo: 'home' }
];
