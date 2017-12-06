import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'hmDefault' })
export class DefaultPipe implements PipeTransform {
    transform(value: string, defaultValue: string[]): any {
        return ((value === null || value === '') && defaultValue !== null)
            ? defaultValue
            : value;
    }
}
