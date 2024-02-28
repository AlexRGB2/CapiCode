import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
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
export class HomeComponent implements AfterViewInit {
  @ViewChild('carouselExample', { static: true })
  carouselElementRef!: ElementRef;

  private carousel!: CarouselInterface;

  ngAfterViewInit() {
    const carouselElement: HTMLElement = this.carouselElementRef!.nativeElement;

    const items: CarouselItem[] = [
      {
        position: 0,
        el: document.getElementById('carousel-item-1')!,
      },
      {
        position: 1,
        el: document.getElementById('carousel-item-2')!,
      },
      {
        position: 2,
        el: document.getElementById('carousel-item-3')!,
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
            el: document.getElementById('carousel-indicator-1')!,
          },
          {
            position: 1,
            el: document.getElementById('carousel-indicator-2')!,
          },
          {
            position: 2,
            el: document.getElementById('carousel-indicator-3')!,
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

  onPrevClick() {
    this.carousel.prev();
  }

  onNextClick() {
    this.carousel.next();
  }
}
