import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boldText',
})
export class BoldTextPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    if (!value) {
      return value;
    }
    return value.replace(/\[([^\]]+)\]/g, '<strong>$1</strong>');
  }
}
