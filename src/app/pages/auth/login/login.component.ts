import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})


export class LoginComponent {
  loginForm = this.formBuilder.group(
    {
      correo: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],
      contrasena: [
        '',
        [
          Validators.required
        ]
      ]
    }
  );

  validaciones = {
    correo: [
      { type: 'required', message: 'El campo es requerido' },
      { type: 'email', message: 'Este no es un correo valido' }
    ],
    contrasena: [
      { type: 'required', message: 'El campo es requerido' }
    ],
  };

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {

  }

  onSubmit() {
    const loginForm = {
      correo: this.loginForm.get('correo')?.value,
      contrasena: this.loginForm.get('contrasena')?.value,
    }

    console.log(loginForm);

    this.authService.signIn(loginForm).subscribe((res: any) => {
      console.log(res);
    });
  }

  get correo() {
    return this.loginForm.get('correo');
  }

  get contrasena() {
    return this.loginForm.get('contrasena');
  }
}
