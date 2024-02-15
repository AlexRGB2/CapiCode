import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { PlanesComponent } from './pages/planes/planes.component';
import { PoliticaPrivacidadComponent } from './pages/politica-privacidad/politica-privacidad.component';
import { TerminosCondicionesComponent } from './pages/terminos-condiciones/terminos-condiciones.component';
import { ErrorComponent } from './pages/error/error.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
    data: {
      breadcrumb: { label: 'Inicio', info: { url: 'home' } },
    },
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      breadcrumb: { label: 'Iniciar Sesión', info: { url: 'login' } },
    },
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      breadcrumb: { label: 'Crear Cuenta', info: { url: 'register' } },
    },
  },
  {
    path: 'plans',
    component: PlanesComponent,
    data: {
      breadcrumb: { label: 'Planes', info: { url: 'plans' } },
    },
  },
  {
    path: 'privacy-policy',
    component: PoliticaPrivacidadComponent,
    data: {
      breadcrumb: {
        label: 'Política de Privacidad',
        info: { url: 'privacy-policy' },
      },
    },
  },
  {
    path: 'terms-conditions',
    component: TerminosCondicionesComponent,
    data: {
      breadcrumb: {
        label: 'Términos y Condiciones',
        info: { url: 'terms-conditions' },
      },
    },
  },
  {
    path: '**',
    component: ErrorComponent,
  },
];
