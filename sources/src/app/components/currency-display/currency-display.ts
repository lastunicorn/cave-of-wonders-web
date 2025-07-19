import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormattedCurrencyValue } from '../../utils/formatted-currency-value';

@Component({
    selector: 'app-currency-display',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './currency-display.html',
    styleUrl: './currency-display.scss'
})
export class CurrencyDisplay {
    @Input({ required: true }) value!: FormattedCurrencyValue;
}
