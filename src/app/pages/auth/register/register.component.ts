import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm = this.formBuilder.group(
    {
      nombre: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z]+$/)
        ]
      ],
      correo: [
        '',
        [
          Validators.required,
          Validators.email,
        ]
      ],
      telefono: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{10}$/)
        ]
      ],
      contrasena: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/),
          Validators.minLength(8),
          Validators.maxLength(40),
        ]
      ],
      repetirContrasena: [
        '',
        [
          Validators.required
        ]
      ],
      aceptarTerminos: [
        false,
        [
          Validators.requiredTrue
        ]
      ]
    },
    {
      validator: this.passwordMatchValidator('contrasena', 'repetirContrasena')
    }
  );

  validaciones = {
    nombre: [
      { type: 'required', message: 'El campo es requerido' },
      { type: 'pattern', message: 'Este campo solo puede contener letras' }
    ],
    correo: [
      { type: 'required', message: 'El campo es requerido' },
      { type: 'email', message: 'Este no es un correo valido' }
    ],
    telefono: [
      { type: 'required', message: 'El campo es requerido' },
      { type: 'pattern', message: 'Este campo debe contener 10 caracteres numéricos' }
    ],
    contrasena: [
      { type: 'required', message: 'El campo es requerido' },
      { type: 'pattern', message: 'Este campo debe contener mayusculas, minusculas, numeros y caracteres especiales' },
      { type: 'minLength', message: 'El mínimo de caracteres es 8' },
      { type: 'maxLength', message: 'El máximo de caracteres es 40' }
    ],
    repetirContrasena: [
      { type: 'required', message: 'El campo es requerido' },
      { type: 'passwordMismatch', message: 'Las contraseñas no coinciden' },
    ],
    aceptarTerminos: [
      { type: 'required', message: 'Debes aceptar los Términos y Condiciones' }
    ]
  };

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {

  }

  passwordMatchValidator(controlName: string, matchingControlName: string): ValidationErrors | null {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const control = formGroup.get(controlName);
      const matchingControl = formGroup.get(matchingControlName);

      if (control && matchingControl && control.value !== matchingControl.value) {
        matchingControl.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      } else {
        matchingControl?.setErrors(null);
        return null;
      }
    };
  }

  onSubmit() {
    const registerForm = {
      nombre: this.registerForm.get('nombre')?.value,
      correo: this.registerForm.get('correo')?.value,
      telefono: this.registerForm.get('telefono')?.value,
      contrasena: this.registerForm.get('contrasena')?.value,
      rol_id: 1
    }

    console.log(registerForm);

    this.authService.signUp(registerForm).subscribe((res: any) => {
      console.log(res);
    });
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
}
