import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { PlanesComponent } from './pages/planes/planes.component';
import { PoliticaPrivacidadComponent } from './pages/politica-privacidad/politica-privacidad.component';
import { TerminosCondicionesComponent } from './pages/terminos-condiciones/terminos-condiciones.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
    data: {
      breadcrumb: 'Inicio',
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
      breadcrumb: 'Iniciar Sesión',
      url: 'login',
    },
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      breadcrumb: 'Crear Cuenta',
    },
  },
  {
    path: 'plans',
    component: PlanesComponent,
    data: {
      breadcrumb: 'Planes',
    },
  },
  {
    path: 'privacy-policy',
    component: PoliticaPrivacidadComponent,
    data: {
      breadcrumb: 'Política de Privacidad',
    },
  },
  {
    path: 'terms-conditions',
    component: TerminosCondicionesComponent,
    data: {
      breadcrumb: 'Términos y Condiciones',
    },
  },
  {
    path: '*',
    redirectTo: 'home',
  },
];
