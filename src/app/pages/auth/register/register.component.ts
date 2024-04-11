import { Component, OnInit, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment';
import { NgxCaptchaModule } from 'ngx-captcha';
import { RegisterForm } from '../../../models/RegisterForm.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NgxCaptchaModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  private router = inject(Router);
  showPassword: boolean = false;
  siteKey: string = environment.siteKeyReCaptcha;

  registerForm = this.formBuilder.group(
    {
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      contrasena: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
          ),
          Validators.minLength(8),
          Validators.maxLength(16),
        ],
      ],
      repetirContrasena: ['', [Validators.required]],
      aceptarTerminos: [false, [Validators.requiredTrue]],
      recaptcha: ['', Validators.required],
    },
    {
      validator: this.passwordMatchValidator('contrasena', 'repetirContrasena'),
    }
  );

  validaciones = {
    nombre: [
      { type: 'required', message: 'El campo es requerido' },
      { type: 'pattern', message: 'Este campo solo puede contener letras' },
    ],
    correo: [
      { type: 'required', message: 'El campo es requerido' },
      { type: 'email', message: 'Este no es un correo valido' },
    ],
    telefono: [
      { type: 'required', message: 'El campo es requerido' },
      {
        type: 'pattern',
        message: 'Este campo debe contener 10 caracteres numéricos',
      },
    ],
    contrasena: [
      { type: 'required', message: 'El campo es requerido' },
      {
        type: 'pattern',
        message:
          'Este campo debe contener mayusculas, minusculas, numeros y caracteres especiales',
      },
      { type: 'minlength', message: 'El mínimo de caracteres es 8' },
      { type: 'maxlength', message: 'El máximo de caracteres es 16' },
    ],
    repetirContrasena: [
      { type: 'required', message: 'El campo es requerido' },
      { type: 'passwordMismatch', message: 'Las contraseñas no coinciden' },
    ],
    aceptarTerminos: [
      { type: 'required', message: 'Debes aceptar los Términos y Condiciones' },
    ],
    recaptcha: [{ type: 'required', message: 'El reCaptcha es requerido.' }],
  };

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.title.setTitle('CapiCode | Registro');
  }

  passwordMatchValidator(
    controlName: string,
    matchingControlName: string
  ): ValidationErrors | null {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const control = formGroup.get(controlName);
      const matchingControl = formGroup.get(matchingControlName);

      if (matchingControl?.value == null || matchingControl?.value == '') {
        matchingControl?.setErrors({ required: true });
        return { required: true };
      } else if (
        control &&
        matchingControl &&
        control.value !== matchingControl.value
      ) {
        matchingControl.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      } else {
        matchingControl?.setErrors(null);
        return null;
      }
    };
  }

  onSubmit() {
    if (!this.registerForm.valid) {
      this.markAllAsDirty();
      return;
    }

    const registerForm: RegisterForm = {
      nombre: this.registerForm.get('nombre')?.value!,
      correo: this.registerForm.get('correo')?.value!,
      telefono: this.registerForm.get('telefono')?.value!,
      contrasena: this.registerForm.get('contrasena')?.value!,
      rol_id: 1,
    };

    this.authService.signUp(registerForm).subscribe((res: any) => {
      if (res.estado == 'Exitó') {
        Swal.fire({
          title: res.estado,
          text: res.mensaje,
          icon: 'success',
          confirmButtonText: 'Cerrar',
          backdrop: false,
          timer: 3000,
        }).then(() => {
          this.router.navigate(['/login']);
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

  togglePasswordVisibility(inputId: string[]) {
    inputId.forEach((item) => {
      const input = document.getElementById(item) as HTMLInputElement;
      if (input.type === 'password') {
        input.type = 'text';
      } else {
        input.type = 'password';
      }
    });

    this.showPassword = !this.showPassword;
  }

  get nombre() {
    return this.registerForm.get('nombre');
  }

  get correo() {
    return this.registerForm.get('correo');
  }

  get telefono() {
    return this.registerForm.get('telefono');
  }

  get contrasena() {
    return this.registerForm.get('contrasena');
  }

  get repetirContrasena() {
    return this.registerForm.get('repetirContrasena');
  }

  get aceptarTerminos() {
    return this.registerForm.get('aceptarTerminos');
  }

  get recaptcha() {
    return this.registerForm.get('recaptcha');
  }

  // Método para marcar todos los campos como "dirty"
  markAllAsDirty() {
    Object.keys(this.registerForm.controls).forEach((controlName) => {
      const control = this.registerForm.get(controlName);
      control?.markAsTouched();
    });
  }
}
