import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'list',
    loadComponent: () => import('./tasks-list/tasks-list.component'),
    title: 'Список задач',
  },
  {
    path: 'task/:taskId',
    loadComponent: () => import('./task/task.component'),
    title: 'Детали задачи',
  },
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'list',
  },
];
