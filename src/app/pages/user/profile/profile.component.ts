import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';
import { AuthService } from '../../../core/services/auth.service';
import { SlicePipe, UpperCasePipe, isPlatformBrowser } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, NgxCaptchaModule, SlicePipe, UpperCasePipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  userForm!: FormGroup;
  editing: boolean = false;
  userName: string = '';

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.userName = localStorage.getItem('userName')!;
      this.authService.setIntervalSession();
    }

    this.userForm = this.fb.group({
      name: [{ value: '', disabled: true }],
      email: [{ value: '', disabled: true }],
      phone: [{ value: '', disabled: true }],
      twoFactorAuth: [{ value: false, disabled: true }]
    });

    this.getUser();
  }

  toggleEdit(): void {
    this.editing = true;
    this.userForm.enable();
  }

  cancelEdit(): void {
    this.editing = false;
    this.userForm.disable();
  }

  updateProfile(): void {
    this.updateUser();
    this.editing = false;
    this.userForm.disable();
  }

  getUser() {
    const userName: any = localStorage.getItem('userName');

    this.authService.getUser(userName).subscribe(
      (res) => {
        const obj: any = res.objeto;
        this.userForm.get('name')?.setValue(obj.nombre);
        this.userForm.get('email')?.setValue(obj.correo);
        this.userForm.get('phone')?.setValue(obj.telefono);
        this.userForm.get('twoFactorAuth')?.setValue(obj.twofa);
      }
    );
  }

  updateUser() {
    const correo: any = this.userForm.get('email')?.value;
    const userName: any = this.userForm.get('name')?.value;
    const telefono: any = this.userForm.get('phone')?.value;
    const twofa: any = this.userForm.get('twoFactorAuth')?.value;

    this.authService.updateUser(correo, userName, telefono, twofa).subscribe(
      (res) => {
        if (res.estado === "Exito") {
          Swal.fire({
            text: res.mensaje,
            icon: 'success',
            timer: 3000,
            backdrop: false,
          });
        } else {
          Swal.fire({
            text: res.mensaje,
            icon: 'error',
            timer: 3000,
            backdrop: false,
          })
        }
      }, (err) => {
        Swal.fire({
          text: err,
          icon: 'error',
          timer: 3000,
          backdrop: false,
        })
      }
    )
  }
}
