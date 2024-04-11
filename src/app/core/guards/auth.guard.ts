import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import Swal from 'sweetalert2';

export const authGuard: CanActivateFn = (route, state) => {
  const platformId = inject(PLATFORM_ID);
  let router = inject(Router);
  let user;

  if (isPlatformBrowser(platformId)) {
    user = localStorage.getItem('userName');
  }

  if (user !== null && user !== undefined) {
    return true;
  } else {
    Swal.fire({
      title: 'Inicia Sesión',
      text: 'Debes iniciar sesión para poder acceder al contenido.',
      icon: 'info',
      confirmButtonText: 'Cerrar',
    });
    router.navigate(['login']);
    return false;
  }
};
