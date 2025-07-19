export class FormattedCurrency {
    public readonly integer: string;
    public readonly decimal: string;

    constructor(value: number) {
        if (value === null || value === undefined) {
            this.integer = '0';
            this.decimal = '00';
            return;
        }
        
        // Format to 2 decimal places and split by decimal point
        const formatted = value.toFixed(2);
        const parts = formatted.split('.');
        
        this.integer = parts[0];
        this.decimal = parts.length > 1 ? parts[1] : '00';
    }
}
