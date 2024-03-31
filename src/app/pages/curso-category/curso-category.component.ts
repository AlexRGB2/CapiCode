import { Component, OnInit, inject } from '@angular/core';
import { Course } from '../../models/InfoCategoria.model';
import { CategoriaService } from '../../core/services/categoria.service';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-curso-category',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './curso-category.component.html',
  styleUrl: './curso-category.component.scss',
})
export class CursoCategoryComponent implements OnInit {
  private categoriaService = inject(CategoriaService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

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
      });
  }

  getCursos() {
    this.route.params.subscribe((param) => {
      const parametro = param['categoria'];
      this.categoria = parametro;
    });

    this.categoriaService.getCategories(this.categoria).subscribe((resp) => {
      this.cursos = resp;
    });
  }
}
