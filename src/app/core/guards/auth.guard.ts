import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import Swal from 'sweetalert2';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const user = localStorage.getItem('userName');

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
