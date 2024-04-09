import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-politica-privacidad',
  standalone: true,
  imports: [],
  templateUrl: './politica-privacidad.component.html',
  styleUrl: './politica-privacidad.component.scss',
})
export class PoliticaPrivacidadComponent implements OnInit {
  private el = inject(ElementRef);
  private title = inject(Title);

  ngOnInit(): void {
    this.title.setTitle('CapiCode | Política de privacidad');
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
