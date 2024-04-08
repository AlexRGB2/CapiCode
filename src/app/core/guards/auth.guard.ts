import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import Swal from 'sweetalert2';

export const authGuard: CanActivateFn = (route, state) => {
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
    return false;
  }
};
