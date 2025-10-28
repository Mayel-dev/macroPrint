import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ResinCalculatorComponent } from './pages/resin-calculator/resin-calculator.component';
import { FilamentCalculatorComponent } from './pages/filament-calculator/filament-calculator.component.';
import { AboutComponent } from './pages/about/about.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'resina', component: ResinCalculatorComponent },
  { path: 'filamento', component: FilamentCalculatorComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: '' },
];
