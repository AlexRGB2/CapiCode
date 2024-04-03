import { Component, inject } from '@angular/core';
import { Course } from '../../models/InfoCategoria.model';
import { Router } from '@angular/router';
import { CurrencyPipe, NgFor } from '@angular/common';
import { YouTubePlayerModule } from '@angular/youtube-player';

@Component({
  selector: 'app-info-course',
  standalone: true,
  imports: [CurrencyPipe, NgFor, YouTubePlayerModule],
  templateUrl: './info-course.component.html',
  styleUrl: './info-course.component.scss',
})
export class InfoCourseComponent {
  private router = inject(Router);
  curso!: Course;

  constructor() {
    const navigation = this.router.getCurrentNavigation();

    if (navigation!.extras.state !== undefined) {
      const state = navigation!.extras.state as {
        curso: Course;
      };
      this.curso = state.curso;
    }
  }

  counter(i: number) {
    i = Math.trunc(i);
    return new Array(i);
  }
}
