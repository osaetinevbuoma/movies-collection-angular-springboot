import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'runtime'
})
export class RuntimePipe implements PipeTransform {
    hours = 0;
    minutes = 0;
    transformed = '';

    /**
     * Transform runtime number to 'hrs mins'
     * @param value the value to transform.
     */
    transform(value: number): string {
        this.hours = Math.floor(value / 60);
        this.minutes = value % 60;

        if (this.hours > 0 && this.hours === 1) { this.transformed += this.hours + ' hr '; }
        if (this.hours > 1) { this.transformed += this.hours + ' hrs '; }
        if (this.minutes > 0 && this.minutes === 1) { this.transformed += this.minutes + ' min'; }
        if (this.minutes > 1) { this.transformed += this.minutes + ' mins'; }

        return this.transformed;
    }

}
