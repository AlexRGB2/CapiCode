import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './pages/header/header.component';
import { initFlowbite } from 'flowbite';
import { FooterComponent } from './pages/footer/footer.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { ScrollToTopButtonComponent } from './components/scroll-to-top-button/scroll-to-top-button.component';

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
    ScrollToTopButtonComponent,
  ],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'CapiCode';

  ngOnInit(): void {
    initFlowbite();
  }

  ngAfterViewInit(): void {
    this.loadScript('../../../assets/js/darkMode.js');
  }

  private loadScript(scriptUrl: string): void {
    const script = document.createElement('script');
    script.src = scriptUrl;
    document.body.appendChild(script);
  }
}
