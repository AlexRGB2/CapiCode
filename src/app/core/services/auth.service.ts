import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginForm } from '../../models/LoginForm.model';
import { RegisterForm } from '../../models/RegisterForm.model';
import { LoginResponse } from '../../models/LoginResponse.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CapiResponse } from '../../models/Response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  intervalId!: NodeJS.Timeout;
  parametroService: any;
  tiempoBaseDeDatos: number = 1;
  tiempoRevisarSesion: number = 10000;
  minutoMilisegundos: any = 10000;
  nickname!: string | null;
  userName: string = '';
  token: any;

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

  setIntervalSession() {
    this.tiempoRevisarSesion = this.minutoMilisegundos * this.tiempoBaseDeDatos;

    // Comprueba la sesion cada minuto
    this.intervalId = setInterval(() => {
      this.verificarSesion();
      console.log('doiasjdojaso');
    }, this.tiempoRevisarSesion);
  }

  clearIntervalSesion() {
    clearInterval(this.intervalId);
  }

  verificarSesion() {
    this.nickname = localStorage.getItem('userName');
    this.token = localStorage.getItem('token');

    if (this.nickname != null) {
      this.getEstatusSesion(this.nickname).subscribe(
        (res) => {
          if (!res.objeto) {
            localStorage.removeItem('userName');
            localStorage.removeItem('token');
            this.userName = '';
            this.token = '';
            this.clearIntervalSesion();
            this.router.navigateByUrl('/');
            this.modalCierreSesion(res.mensaje);
          }
        },
        (err) => {}
      );
    }
  }

  modalCierreSesion(text: any) {
    Swal.fire({
      icon: 'warning',
      title: 'Sesión Cerrada',
      text: text,
    }).then(() => {
      window.location.reload();
    });
  }

  getEstatusSesion(userName: string): Observable<any | void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': this.token,
    });

    let json = {
      userName: userName,
    };

    return this.http
      .post(`${environment.API_URL}/api/auth/getEstatusSesion`, json, {
        headers: headers,
      })
      .pipe(
        (res) => {
          return res;
        },
        catchError((err) => this.handlerError(err))
      );
  }

  logOutEstatusSesion(userName: string): Observable<any | void> {
    let json = {
      userName: userName,
    };

    return this.http.post(`${environment.API_URL}/api/auth/logOut`, json).pipe(
      (res) => {
        return res;
      },
      catchError((err) => this.handlerError(err))
    );
  }

  private handlerError(error: any): Observable<never> {
    let errorMessage = 'An error ocurred retraving data';
    errorMessage = error.cuerpo;

    if (error.objeto === 'Bad credentials') {
      errorMessage =
        'El usuario o contraseña son incorrectos intente nuevamente';
      //this.logout();
    } else {
      //this.logout();
    }

    return throwError(errorMessage);
  }

  sendMail2FA(email: string, password: string) {
    const json = {
      correo: email,
      contrasena: password,
    };

    return this.http.post<CapiResponse>(
      `${environment.API_URL}/api/auth/2FA`,
      json
    );
  }

  validCode2FA(codeOtp: string, secret: string) {
    const json = {
      codigo: codeOtp,
      secret: secret,
    };

    return this.http.post<CapiResponse>(
      `${environment.API_URL}/api/auth/validCode2FA`,
      json
    );
  }

  updateUser(
    correo: string,
    userName: string,
    telefono: string,
    twofa: boolean
  ) {
    const json = {
      correo: correo,
      userName: userName,
      telefono: telefono,
      twofa: twofa,
    };

    return this.http.post<CapiResponse>(
      `${environment.API_URL}/api/user/updateUser`,
      json
    );
  }

  getUser(userName: string) {
    const json = {
      userName: userName,
    };

    return this.http.post<CapiResponse>(
      `${environment.API_URL}/api/user/getUser`,
      json
    );
  }
}
