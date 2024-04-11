import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { resetPasswordGuard } from './core/guards/reset-password.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((c) => c.HomeComponent),
    data: {
      breadcrumb: { label: 'Inicio', info: { url: '' } },
    },
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/auth/login/login.component').then(
        (c) => c.LoginComponent
      ),
    data: {
      breadcrumb: { label: 'Iniciar Sesión', info: { url: 'login' } },
    },
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/auth/register/register.component').then(
        (c) => c.RegisterComponent
      ),
    data: {
      breadcrumb: { label: 'Crear Cuenta', info: { url: 'register' } },
    },
  },
  {
    path: 'category/:categoria',
    loadComponent: () =>
      import('./pages/curso-category/curso-category.component').then(
        (c) => c.CursoCategoryComponent
      ),
    data: {
      breadcrumb: {
        label: '',
        info: { url: '' },
      },
    },
  },
  {
    path: 'category/:categoria/:curso',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/info-course/info-course.component').then(
        (c) => c.InfoCourseComponent
      ),
    data: {
      breadcrumb: {
        label: '',
        info: { url: '' },
      },
    },
  },
  {
    path: 'plans',
    loadComponent: () =>
      import('./pages/planes/planes.component').then((c) => c.PlanesComponent),
    data: {
      breadcrumb: { label: 'Planes', info: { url: 'plans' } },
    },
  },
  {
    path: 'reset-password',
    canActivate: [resetPasswordGuard],
    loadComponent: () =>
      import('./pages/user/recover-password/recover-password.component').then(
        (c) => c.RecoverPasswordComponent
      ),
    data: {
      breadcrumb: {
        label: 'Reestablecer Contraseña',
        info: { url: 'reset-password' },
      },
    },
  },
  {
    path: 'privacy-policy',
    loadComponent: () =>
      import('./pages/politica-privacidad/politica-privacidad.component').then(
        (c) => c.PoliticaPrivacidadComponent
      ),
    data: {
      breadcrumb: {
        label: 'Política de Privacidad',
        info: { url: 'privacy-policy' },
      },
    },
  },
  {
    path: 'terms-conditions',
    loadComponent: () =>
      import(
        './pages/terminos-condiciones/terminos-condiciones.component'
      ).then((c) => c.TerminosCondicionesComponent),
    data: {
      breadcrumb: {
        label: 'Términos y Condiciones',
        info: { url: 'terms-conditions' },
      },
    },
  },
  {
    path: 'sitemap',
    loadComponent: () =>
      import('./pages/site-map/site-map.component').then(
        (c) => c.SiteMapComponent
      ),
    data: {
      breadcrumb: {
        label: 'Mapa del Sitio',
        info: { url: 'sitemap' },
      },
    },
  },
  {
    path: 'user-profile',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/user/profile/profile.component').then(
        (c) => c.ProfileComponent
      ),
    data: {
      breadcrumb: {
        label: 'Perfil de usuario',
        info: { url: 'user-profile' },
      },
    },
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/error/error.component').then((c) => c.ErrorComponent),
  },
];
