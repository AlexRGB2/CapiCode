import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { ErrorComponent } from './pages/error/error.component';

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
    path: '**',
    component: ErrorComponent
  },
];
