import { SlicePipe, UpperCasePipe, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, SlicePipe, UpperCasePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  userName: string = '';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.userName = localStorage.getItem('userName')!;
      this.authService.setIntervalSession();
    }
  }

  /**
   * @author AlexRGB2
   * @description Método que envia a el usuario a el principio de la página.
   */
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * @author AlexRGB2
   * @description Método que cierra la sesión del usuario.
   */
  logOut() {
    this.authService.logOut().then((resp) => {
      if (resp.isConfirmed) {
        this.authService.logOutEstatusSesion(this.userName).subscribe((res) => {
          localStorage.removeItem('userName');
          this.userName = '';
          this.router.navigateByUrl('/');
          this.authService.clearIntervalSesion();
        });
      }
    });
  }
}
