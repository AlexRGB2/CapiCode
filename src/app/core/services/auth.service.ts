import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginForm } from '../../models/LoginForm.model';
import { RegisterForm } from '../../models/RegisterForm.model';
import { LoginResponse } from '../../models/LoginResponse.model';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  signIn(loginForm: LoginForm) {
    return this.http
      .post<any>(`${environment.API_URL}/api/auth/signIn`, loginForm)
      .pipe(
        map((res: LoginResponse) => {
          return res;
        })
      );
  }

  signUp(registerForm: RegisterForm) {
    return this.http
      .post<any>(`${environment.API_URL}/api/auth/signUp`, registerForm)
      .pipe(
        map((res: any) => {
          console.log(res);
          return res;
        })
      );
  }

  logOut() {
    return Swal.fire({
      title: '¿Seguro que quieres cerrar sesión?',
      icon: 'question',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      showCancelButton: true,
    });
  }
}
