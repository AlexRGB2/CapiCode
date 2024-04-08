import { Component, inject } from '@angular/core';
import { Course } from '../../models/InfoCategoria.model';
import { Router } from '@angular/router';
import { CurrencyPipe, NgFor } from '@angular/common';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-info-course',
  standalone: true,
  imports: [CurrencyPipe, NgFor, YouTubePlayerModule],
  templateUrl: './info-course.component.html',
  styleUrl: './info-course.component.scss',
})
export class InfoCourseComponent {
  private router = inject(Router);
  private breadcrumbService = inject(BreadcrumbService);
  curso!: Course;
  categoria: string = '';

  constructor() {
    const navigation = this.router.getCurrentNavigation();

    if (navigation!.extras.state !== undefined) {
      const state = navigation!.extras.state as {
        curso: Course;
        categoria: string;
      };
      this.curso = state.curso;
      this.categoria = state.categoria;
    }

    setTimeout(() => {
      this.breadcrumbService.set('category/:categoria/:curso', {
        label: this.curso.title,
        info: { url: 'category/' + this.categoria + '/' + this.curso.title },
      });
    }, 100);
  }

  counter(i: number) {
    i = Math.trunc(i);
    return new Array(i);
  }
}
