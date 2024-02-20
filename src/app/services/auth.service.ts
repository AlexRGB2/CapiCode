import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signIn(loginForm: any) {
    return this.http
      .post<any>(`${environment.API_URL}/api/auth/signIn`, loginForm)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  signUp(registerForm: any) {
    return this.http
      .post<any>(`${environment.API_URL}/api/auth/signUp`, registerForm)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
}
