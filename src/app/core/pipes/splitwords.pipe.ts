import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitwords',
  standalone: true,
})
export class SplitwordsPipe implements PipeTransform {
  transform(value: string): string {
    // Reemplazar "diseno" por "diseño" y luego separar las palabras por guión
    return value.split('-').join(' ');
  }
}
