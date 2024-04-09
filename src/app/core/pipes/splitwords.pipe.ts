import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitwords',
  standalone: true,
})
export class SplitwordsPipe implements PipeTransform {
  transform(value: string): string {
    return value.split('-').join(' ');
  }
}
