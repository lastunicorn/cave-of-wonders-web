export class FormattedCurrencyValue {
    public readonly integer: string;
    public readonly decimal: string;
    public readonly currency: string;

    constructor(value: number, currency: string) {
        if (value === null || value === undefined) {
            this.integer = '0';
            this.decimal = '00';
            this.currency = currency || '';
        }
        else {
            // Format to 2 decimal places and split by decimal point
            const formatted = value.toFixed(2);
            const parts = formatted.split('.');

            this.integer = parts[0];
            this.decimal = parts.length > 1 ? parts[1] : '00';
            this.currency = currency;
        }
    }
}