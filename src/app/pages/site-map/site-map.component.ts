import { Component, OnInit, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-site-map',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './site-map.component.html',
  styleUrl: './site-map.component.scss',
})
export class SiteMapComponent implements OnInit {
  private title = inject(Title);

  ngOnInit(): void {
    this.title.setTitle('CapiCode | Mapa del Sitio');
  }
}
