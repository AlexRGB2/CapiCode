import { SlicePipe, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, SlicePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, AfterViewInit {
  userName: string = '';

  constructor(
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {}
  ngAfterViewInit(): void {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.userName = sessionStorage.getItem('userName')!;
    }
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  logOut() {
    this.authService.logOut().then((resp) => {
      if (resp.isConfirmed) {
        sessionStorage.removeItem('userName');
        this.userName = '';
        this.router.navigateByUrl('/');
      }
    });
  }
}
