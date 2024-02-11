import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './pages/header/header.component';
import { initFlowbite } from 'flowbite';
import { FooterComponent } from './pages/footer/footer.component';
import { BreadcrumbModule } from 'xng-breadcrumb';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    BreadcrumbModule,
    RouterLink,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'CapiCode';

  ngOnInit(): void {
    initFlowbite();
    this.loadScript('../../../assets/js/darkMode.js');
  }

  private loadScript(scriptUrl: string): void {
    const script = document.createElement('script');
    script.src = scriptUrl;
    document.body.appendChild(script);
  }
}
