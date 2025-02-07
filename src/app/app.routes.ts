import { Routes } from '@angular/router';
import { Studentroutes } from './pages/app.student.routes';

export const routes: Routes = [
  {
    path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.component'),
    title:'Inicio',
    children: Studentroutes,
  },
  {
    path:'',
    redirectTo:'/dashboard/students',
    pathMatch: 'full',
  },
  {
    path: 'noPageFound',
    title: 'Pagína no encontrada',
    loadComponent: () => import('./pages/no-page-found/no-page-found.component'),
  },
  {
    path: '**',
    redirectTo: '/noPageFound',
    pathMatch: 'full',
  },
];
