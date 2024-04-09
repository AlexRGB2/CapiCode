import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Course } from '../../models/InfoCategoria.model';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private http = inject(HttpClient);

  /**
   * @author AlexRGB2
   * @description Método obtiene las categorias de los assets.
   */
  getCategories(category: string): Observable<any> {
    return this.http
      .get<any>('assets/json/cursos.json')
      .pipe(map((data) => data.categoria[category]));
  }
}
