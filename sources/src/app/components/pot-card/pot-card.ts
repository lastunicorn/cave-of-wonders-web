import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PotInstance } from '../../models/pot-instance.model';

@Component({
    selector: 'app-pot-card',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './pot-card.html',
    styleUrl: './pot-card.scss'
})
export class PotCard {
    @Input({ required: true }) account!: PotInstance;

    formatCurrency(value: number): { integer: string, decimal: string } {
        if (value === null || value === undefined) {
            return {
                integer: '0',
                decimal: '00'
            };
        }
        
        // Format to 2 decimal places and split by decimal point
        const formatted = value.toFixed(2);
        const parts = formatted.split('.');
        
        return {
            integer: parts[0],
            decimal: parts.length > 1
                ? parts[1]
                : '00'
        };
    }
}
