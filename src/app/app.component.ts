import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  afterRender,
  runInInjectionContext,
} from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './pages/header/header.component';
import { initFlowbite } from 'flowbite';
import { FooterComponent } from './pages/footer/footer.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { ScrollToTopButtonComponent } from './components/scroll-to-top-button/scroll-to-top-button.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ErrorComponent } from './pages/error/error.component';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    BreadcrumbModule,
    RouterModule,
    ErrorComponent,
    ScrollToTopButtonComponent,
    LoginComponent,
    RegisterComponent,
  ],
})
export class AppComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      initFlowbite();
    }
  }
}
