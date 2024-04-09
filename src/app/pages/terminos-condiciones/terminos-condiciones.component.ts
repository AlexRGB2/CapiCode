import { Component, ElementRef, OnInit, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-terminos-condiciones',
  standalone: true,
  imports: [],
  templateUrl: './terminos-condiciones.component.html',
  styleUrl: './terminos-condiciones.component.scss',
})
export class TerminosCondicionesComponent implements OnInit {
  private el = inject(ElementRef);
  private title = inject(Title);

  ngOnInit(): void {
    this.title.setTitle('CapiCode | Términos y Condiciones');
  }

  /**
   * @author AlexRGB2
   * @description Método envia a el usuario a la sección deseada.
   */
  scrollToSection(sectionId: string) {
    const element = this.el.nativeElement.querySelector(`#${sectionId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
