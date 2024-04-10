import { Component, Inject, OnInit, PLATFORM_ID, importProvidersFrom, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';
import { NgxCaptchaModule } from 'ngx-captcha';
import { environment } from '../../../../environments/environment';
import { LoginForm } from '../../../models/LoginForm.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgxCaptchaModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private title = inject(Title);
  private router = inject(Router);

  siteKey: string = environment.siteKeyReCaptcha;
  loginForm = this.formBuilder.group({
    correo: ['', [Validators.required, Validators.email]],
    contrasena: [
      '',
      [Validators.required, Validators.minLength(8), Validators.maxLength(16)],
    ],
    recaptcha: ['', Validators.required],
  });

  validaciones = {
    correo: [
      { type: 'required', message: 'El campo es requerido' },
      { type: 'email', message: 'Este no es un correo valido' },
    ],
    contrasena: [
      { type: 'required', message: 'El campo es requerido' },
      { type: 'minlength', message: 'El mínimo de caracteres es 8' },
      { type: 'maxlength', message: 'El máximo de caracteres es 16' },
    ],
    recaptcha: [{ type: 'required', message: 'El reCaptcha es requerido.' }],
  };

  ngOnInit(): void {
    this.title.setTitle('CapiCode | Inicia sesión');
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      this.markAllAsDirty();
      return;
    }

    const loginForm: LoginForm = {
      correo: this.loginForm.get('correo')?.value!,
      contrasena: this.loginForm.get('contrasena')?.value!,
    };

    this.authService.signIn(loginForm).subscribe((res: any) => {
      if (res.estado == 'Exitó') {
        this.router.navigateByUrl('/').finally(() => {
          localStorage.setItem('userName', res.objeto.nombre!);
          localStorage.setItem('token', res.token);
          this.authService.setIntervalSession();
          window.location.reload();
        });
      } else {
        Swal.fire({
          title: res.estado,
          text: res.mensaje,
          icon: 'error',
          confirmButtonText: 'Cerrar',
        });
      }
    });
  }

  /**
   * @author AlexRGB2
   * @description Método que envia un correo al usuario para reestablecer su contraseña.
   * @returns void.
   */
  async recovePassword() {
    const { value: email } = await Swal.fire({
      title: 'Reestablecer tu contraseña',
      text: 'Para reestablecer tu contraseña solicitamos el correo electronico de tu cuenta.',
      input: 'email',
      inputValue: '',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
    });

    if (email) {
      // TODO: Realizar función para enviar un código a el correo.
      // TODO: Validar el código de un solo uso.
      // TODO: En una nueva, ventana solicitar la nueva contraseña.
      // TODO: Actualizar en base de datos la contraseña del usuario.
    }
  }

  get correo() {
    return this.loginForm.get('correo');
  }

  get contrasena() {
    return this.loginForm.get('contrasena');
  }

  get recaptcha() {
    return this.loginForm.get('recaptcha');
  }

  // Método para marcar todos los campos como "dirty"
  markAllAsDirty() {
    Object.keys(this.loginForm.controls).forEach((controlName) => {
      const control = this.loginForm.get(controlName);
      control?.markAsTouched();
    });
  }
}
