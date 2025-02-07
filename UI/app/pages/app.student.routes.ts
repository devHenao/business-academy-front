import { Routes } from '@angular/router';

export const Studentroutes: Routes = [
  {
    path: 'students',
    title: 'Estudiantes',
    loadComponent: () => import('./student/lis-student/student.component'),
  },
  {
    path: 'grades',
    title: 'Calificaciones',
    loadComponent: () => import('./grades/grades.component'),
  },
  {
    path: 'studentRegister',
    title: 'Registrar Estudainte',
    loadComponent: () => import('./student/register-student/register-student.component'),
  },
];
