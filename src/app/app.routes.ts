import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'list',
    loadComponent: () => import('./tasks-list/tasks-list.component'),
  },
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
];
