import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginForm } from '../../models/LoginForm.model';
import { RegisterForm } from '../../models/RegisterForm.model';
import { LoginResponse } from '../../models/LoginResponse.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

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
    this.tiempoRevisarSesion =
      this.minutoMilisegundos * this.tiempoBaseDeDatos;

    // Comprueba la sesion cada minuto
    this.intervalId = setInterval(() => {
      this.verificarSesion();
    }, this.tiempoRevisarSesion);
  };

  clearIntervalSesion() {
    clearInterval(this.intervalId);
  }

  verificarSesion() {
    this.nickname = localStorage.getItem('userName');

    if (this.nickname != null) {
      this.getEstatusSesion(this.nickname).subscribe(
        (res) => {
          if (!res.objeto) {
            localStorage.removeItem('userName');
            this.userName = '';
            this.clearIntervalSesion();
            this.router.navigateByUrl('/');
            this.modalCierreSesion(
              'Sesión cerrada por inicio en otro dispositivo'
            );
          }
        },
        (err) => { }
      );
    }
  }

  modalCierreSesion(text: any) {
    Swal.fire({
      icon: 'warning',
      title: 'Sesión Cerrada',
      text: text
    }).then(() => {
      window.location.reload()
    }
    );
  }

  getEstatusSesion(userName: string): Observable<any | void> {
    let json = {
      userName: userName
    }

    return this.http
      .post(
        `${environment.API_URL}/api/auth/getEstatusSesion`,
        json
      )
      .pipe(
        (res) => {
          return res;
        },
        catchError((err) => this.handlerError(err))
      );
  }

  logOutEstatusSesion(userName: string): Observable<any | void> {
    let json = {
      userName: userName
    }

    return this.http
      .post(
        `${environment.API_URL}/api/auth/logOut`,
        json
      )
      .pipe(
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
}
