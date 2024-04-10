import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ResetPasswordService } from '../services/reset-password.service';

export const resetPasswordGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const resetPassService = inject(ResetPasswordService);

  if (resetPassService.isEnabled) {
    return true;
  } else {
    router.navigate(['']);
    return false;
  }
};
