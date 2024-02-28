import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm = this.formBuilder.group({
    correo: [
      '',
      [
        Validators.required, Validators.email
      ]
    ],
    contrasena: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16),
      ]
    ],
  });

  validaciones = {
    correo: [
      { type: 'required', message: 'El campo es requerido' },
      { type: 'email', message: 'Este no es un correo valido' },
    ],
    contrasena: [
      { type: 'required', message: 'El campo es requerido' },
      { type: 'minlength', message: 'El mínimo de caracteres es 8' },
      { type: 'maxlength', message: 'El máximo de caracteres es 16' }
    ],
  };

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  onSubmit() {
    if (!this.loginForm.valid) {
      this.markAllAsDirty();
      return;
    }

    const loginForm = {
      correo: this.loginForm.get('correo')?.value,
      contrasena: this.loginForm.get('contrasena')?.value,
    };

    console.log(loginForm);

    this.authService.signIn(loginForm).subscribe((res: any) => {
      if (res.estado == "Exitó") {
        Swal.fire({
          title: res.estado,
          text: res.mensaje,
          icon: 'success',
          confirmButtonText: 'Cerrar'
        })
      } else {
        Swal.fire({
          title: res.estado,
          text: res.mensaje,
          icon: 'error',
          confirmButtonText: 'Cerrar'
        })
      }
    });
  }

  get correo() {
    return this.loginForm.get('correo');
  }

  get contrasena() {
    return this.loginForm.get('contrasena');
  }

  // Método para marcar todos los campos como "dirty"
  markAllAsDirty() {
    Object.keys(this.loginForm.controls).forEach(controlName => {
      const control = this.loginForm.get(controlName);
      control?.markAsTouched();
    });
  }
}
