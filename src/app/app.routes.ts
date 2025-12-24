import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
	{
		path: 'login',
		loadComponent: () => import('./features/login/login').then(m => m.Login),
	},
  {
    path: 'calendar',
    loadComponent: () => import('./features/calendar/calendar').then(m => m.Calendar),
    canActivate: [AuthGuard],
  },
];
