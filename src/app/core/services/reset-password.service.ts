import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CapiResponse } from '../../models/Response.model';

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordService {
  private http = inject(HttpClient);
  public isEnabled = false;

  sendMail(email: string) {
    const json = {
      correo: email,
    };

    return this.http.post<CapiResponse>(
      `${environment.API_URL}/api/mail/recovePassword`,
      json
    );
  }

  validCode(codeOtp: string, secret: string) {
    const json = {
      codigo: codeOtp,
      secret: secret,
    };

    return this.http.post<CapiResponse>(
      `${environment.API_URL}/api/mail/validCode`,
      json
    );
  }

  updatePassword(email: string, newPassword: string) {
    const json = {
      correo: email,
      password: newPassword,
    };

    return this.http.post<CapiResponse>(
      `${environment.API_URL}/api/user/updatePassword`,
      json
    );
  }
}
