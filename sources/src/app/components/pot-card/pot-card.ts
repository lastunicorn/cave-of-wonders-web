import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PotInstance } from '../../models/pot-instance.model';
import { FormattedCurrency } from '../../utils/formatted-currency';

@Component({
    selector: 'app-pot-card',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './pot-card.html',
    styleUrl: './pot-card.scss'
})
export class PotCard {
    @Input({ required: true })
    public account!: PotInstance;

    private _value!: FormattedCurrency;
    private _normalizedValue!: FormattedCurrency;

    get isActive(): boolean {
        return this.account.isActive;
    }

    get accountId(): string {
        return this.account.id;
    }

    get name(): string {
        return this.account.name;
    }

    get currency(): string {
        return this.account.value.currency;
    }

    get date(): string | Date {
        return this.account.value.date;
    }

    get value(): FormattedCurrency {
        if (!this._value) {
            this._value = new FormattedCurrency(this.account.value.value);
        }
        return this._value;
    }

    get normalizedValue(): FormattedCurrency {
        if (!this._normalizedValue) {
            this._normalizedValue = new FormattedCurrency(this.account.normalizedValue?.value || 0);
        }
        return this._normalizedValue;
    }

    get isNormalizedValueVisible(): boolean {
        return this.account.normalizedValue && this.account.normalizedValue.currency !== this.account.value.currency;
    }
}