import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ResetPasswordService } from '../../../core/services/reset-password.service';
import { Router } from '@angular/router';
import { CapiResponse } from '../../../models/Response.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recover-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './recover-password.component.html',
  styleUrl: './recover-password.component.scss',
})
export class RecoverPasswordComponent {
  private formBuilder = inject(FormBuilder);
  private resetPassService = inject(ResetPasswordService);
  private router = inject(Router);

  private correo: string = '';
  showPassword: boolean = false;

  newPasswordForm = this.formBuilder.group(
    {
      password: [
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
      confirmPassword: ['', [Validators.required]],
    },
    {
      validator: this.passwordMatchValidator('password', 'confirmPassword'),
    }
  );

  validaciones = {
    password: [
      { type: 'required', message: 'El campo es requerido' },
      {
        type: 'pattern',
        message:
          'Este campo debe contener mayusculas, minusculas, numeros y caracteres especiales',
      },
      { type: 'minlength', message: 'El mínimo de caracteres es 8' },
      { type: 'maxlength', message: 'El máximo de caracteres es 16' },
    ],
    confirmPassword: [
      { type: 'required', message: 'El campo es requerido' },
      { type: 'passwordMismatch', message: 'Las contraseñas no coinciden' },
    ],
  };

  constructor() {
    const navigation = this.router.getCurrentNavigation();

    if (navigation!.extras.state !== undefined) {
      const state = navigation!.extras.state as {
        correo: string;
      };
      this.correo = state.correo;
    }
  }

  updatePassword() {
    if (!this.newPasswordForm.valid) {
      this.markAllAsDirty();
      return;
    }

    const newPassword = this.newPasswordForm.get('password')?.value!;

    this.resetPassService.updatePassword(this.correo, newPassword).subscribe(
      (resp: CapiResponse) => {
        if (resp.estado.toLowerCase() === 'exito') {
          Swal.fire({
            text: resp.mensaje,
            icon: 'success',
            timer: 3000,
            backdrop: false,
          }).then(() => {
            this.resetPassService.isEnabled = false;
            this.router.navigate(['/login']);
          });
        }
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: err.error.estado,
          text: err.error.mensaje,
          timer: 3000,
          backdrop: false,
        });
      }
    );
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

  get password() {
    return this.newPasswordForm.get('password');
  }

  get confirmPassword() {
    return this.newPasswordForm.get('confirmPassword');
  }

  // Método para marcar todos los campos como "dirty"
  markAllAsDirty() {
    Object.keys(this.newPasswordForm.controls).forEach((controlName) => {
      const control = this.newPasswordForm.get(controlName);
      control?.markAsTouched();
    });
  }
}
