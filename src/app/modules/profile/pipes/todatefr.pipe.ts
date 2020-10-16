import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'toDateFR'
})
export class ToDateFR implements PipeTransform {

    transform(value: Date, ...args: any[]): string {
        return formatDate(value, 'longDate', 'fr-fr');
    }

}