import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { Course } from '../../models/InfoCategoria.model';
import { CategoriaService } from '../../core/services/categoria.service';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationExtras,
  Router,
  RouterModule,
} from '@angular/router';
import { filter } from 'rxjs';
import { BreadcrumbService } from 'xng-breadcrumb';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-curso-category',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './curso-category.component.html',
  styleUrl: './curso-category.component.scss',
})
export class CursoCategoryComponent implements OnInit, AfterViewInit {
  private title = inject(Title);
  private categoriaService = inject(CategoriaService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private breadcrumbService = inject(BreadcrumbService);

  categoria: string = '';
  cursos: Course[] = [];

  ngOnInit(): void {
    this.getCursos();

    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        this.getCursos();
        setTimeout(() => {
          this.breadcrumbService.set('category/:categoria', {
            label: this.categoria,
            info: { url: 'category/' + this.categoria },
          });
          this.title.setTitle(
            'CapiCode | ' +
              this.categoria.charAt(0).toUpperCase() +
              this.categoria.slice(1).split('-').join(' ')
          );
        }, 1000);
      });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.breadcrumbService.set('category/:categoria', {
        label: this.categoria,
        info: { url: 'category/' + this.categoria },
      });
      this.title.setTitle('CapiCode | ' + this.categoria);
    }, 100);
  }

  /**
   * @author AlexRGB2
   * @description Metodo que obtiene todos los cursos de una categoria.
   */
  getCursos() {
    this.route.params.subscribe((param) => {
      const parametro = param['categoria'];
      this.categoria = parametro;
    });

    this.categoriaService.getCategories(this.categoria).subscribe((resp) => {
      this.cursos = resp;
    });
  }

  /**
   * @author AlexRGB2
   * @description Metodo que redirecciona a un curso.
   * @param curso - Datos a gestionar
   */
  setCourse(curso: Course) {
    const navigationExtras: NavigationExtras = {
      state: {
        curso: curso,
        categoria: this.categoria,
      },
    };

    this.router.navigate(
      ['/category/' + this.categoria + '/' + curso.title],
      navigationExtras
    );
  }
}
