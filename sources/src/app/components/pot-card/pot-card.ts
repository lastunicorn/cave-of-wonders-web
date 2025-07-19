import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PotInstance } from '../../models/pot-instance.model';
import { FormattedCurrencyValue } from '../../utils/formatted-currency-value';
import { CurrencyDisplay } from '../currency-display/currency-display';

@Component({
    selector: 'app-pot-card',
    standalone: true,
    imports: [CommonModule, CurrencyDisplay],
    templateUrl: './pot-card.html',
    styleUrl: './pot-card.scss'
})
export class PotCard {
    @Input({ required: true }) account!: PotInstance;

    private _value!: FormattedCurrencyValue;
    private _normalizedValue!: FormattedCurrencyValue;

    get isActive(): boolean {
        return this.account.isActive;
    }

    get accountId(): string {
        return this.account.id;
    }

    get name(): string {
        return this.account.name;
    }

    get date(): string | Date {
        return this.account.value.date;
    }

    get value(): FormattedCurrencyValue {
        if (!this._value) {
            this._value = new FormattedCurrencyValue(this.account.value.value, this.account.value.currency);
        }
        return this._value;
    }

    get normalizedValue(): FormattedCurrencyValue {
        if (!this._normalizedValue) {
            this._normalizedValue = new FormattedCurrencyValue(this.account.normalizedValue?.value || 0, this.account.normalizedValue?.currency || '');
        }
        return this._normalizedValue;
    }

    get isNormalizedValueVisible(): boolean {
        return this.account.normalizedValue && this.account.normalizedValue.currency !== this.account.value.currency;
    }
}