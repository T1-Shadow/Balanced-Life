import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
  {
    path: 'habitos',
    loadComponent: () => import('./pages/productividad/habitos/habitos.page').then( m => m.HabitosPage)
  },
  {
    path: 'tareas',
    loadComponent: () => import('./pages/productividad/tareas/tareas.page').then( m => m.TareasPage)
  },
  {
    path: 'limpieza',
    loadComponent: () => import('./pages/productividad/limpieza/limpieza.page').then( m => m.LimpiezaPage)
  },
  {
    path: 'recetas',
    loadComponent: () => import('./pages/salud/recetas/recetas.page').then( m => m.RecetasPage)
  },
  {
    path: 'planificador-comidas',
    loadComponent: () => import('./pages/salud/planificador-comidas/planificador-comidas.page').then( m => m.PlanificadorComidasPage)
  },
  {
    path: 'hidratacion',
    loadComponent: () => import('./pages/salud/hidratacion/hidratacion.page').then( m => m.HidratacionPage)
  },
  {
    path: 'logros',
    loadComponent: () => import('./pages/diversion/logros/logros.page').then( m => m.LogrosPage)
  },
  {
    path: 'inicio',
    loadComponent: () => import('./pages/pantalla-inicio/inicio/inicio.page').then( m => m.InicioPage)
  },
  {
    path: 'registro',
    loadComponent: () => import('./pages/pantalla-inicio/registro/registro.page').then( m => m.RegistroPage)
  },
];
