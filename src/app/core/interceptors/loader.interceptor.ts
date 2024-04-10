import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const spinnerService = inject(NgxSpinnerService);

  if (!req.url.endsWith("/api/auth/getEstatusSesion")) {
    spinnerService.show();
  }

  return next(req).pipe(
    finalize(() => {
      spinnerService.hide();
    })
  );
};
