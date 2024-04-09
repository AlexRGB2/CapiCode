import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { Carousel } from 'flowbite';
import type {
  CarouselItem,
  CarouselOptions,
  CarouselInterface,
} from 'flowbite';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements AfterViewInit, OnInit {
  @ViewChild('carouselExample', { static: true })
  carouselElementRef!: ElementRef;

  @ViewChild('carouselitem1', { static: true })
  carouselItem1!: ElementRef;

  @ViewChild('carouselitem2', { static: true })
  carouselItem2!: ElementRef;

  @ViewChild('carouselitem3', { static: true })
  carouselItem3!: ElementRef;

  @ViewChild('carouselindicator1', { static: true })
  carouselindicator1!: ElementRef;

  @ViewChild('carouselindicator2', { static: true })
  carouselindicator2!: ElementRef;

  @ViewChild('carouselindicator3', { static: true })
  carouselindicator3!: ElementRef;

  private carousel!: CarouselInterface;

  constructor(private title: Title) {}

  ngOnInit(): void {
    this.title.setTitle('CapiCode | Aprende Programación en Línea');
  }

  ngAfterViewInit() {
    const carouselElement: HTMLElement = this.carouselElementRef.nativeElement;

    const items: CarouselItem[] = [
      {
        position: 0,
        el: this.carouselItem1.nativeElement,
      },
      {
        position: 1,
        el: this.carouselItem2.nativeElement,
      },
      {
        position: 2,
        el: this.carouselItem3.nativeElement,
      },
    ];

    const options: CarouselOptions = {
      defaultPosition: 1,
      interval: 3000,
      indicators: {
        activeClasses: 'bg-white dark:bg-gray-800',
        inactiveClasses:
          'bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800',
        items: [
          {
            position: 0,
            el: this.carouselindicator1.nativeElement,
          },
          {
            position: 1,
            el: this.carouselindicator2.nativeElement,
          },
          {
            position: 2,
            el: this.carouselindicator3.nativeElement,
          },
        ],
      },
    };

    const instanceOptions = {
      id: 'carousel-example',
      override: true,
    };

    this.carousel = new Carousel(
      carouselElement,
      items,
      options,
      instanceOptions
    );

    this.carousel.cycle();
  }

  /**
   * @author AlexRGB2
   * @description Método regresa las imagenes del carusel.
   */
  onPrevClick() {
    this.carousel.prev();
  }

  /**
   * @author AlexRGB2
   * @description Método avanza las imagenes del carusel.
   */
  onNextClick() {
    this.carousel.next();
  }
}
