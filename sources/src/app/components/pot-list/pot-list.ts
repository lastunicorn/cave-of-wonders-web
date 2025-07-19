import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PotService } from '../../external/cave-api/pot.proxy';
import { PotInstance, MonetaryValue } from '../../models/pot-instance.model';
import { HttpClientModule } from '@angular/common/http';
import { ConversionRate, CurrencyTotalOverview } from '../../models/pot-response.model';
import { FormsModule } from '@angular/forms';
import { PotCard } from '../pot-card/pot-card';

@Component({
    selector: 'app-pot-list',
    standalone: true,
    imports: [CommonModule, HttpClientModule, FormsModule, PotCard],
    templateUrl: './pot-list.html',
    styleUrl: './pot-list.scss'
})
export class PotList implements OnInit {
    potInstances = signal<PotInstance[]>([]);
    loading = signal<boolean>(false);
    error = signal<string | null>(null);
    totalValue = signal<MonetaryValue | null>(null);
    conversionRates = signal<ConversionRate[]>([]);
    currencyOverviews = signal<CurrencyTotalOverview[]>([]);
    responseDate = signal<Date | null>(null);

    currencies = [
        { code: '', label: 'Not specified' },
        { code: 'RON', label: 'RON' },
        { code: 'EUR', label: 'EUR' }
    ];
    selectedCurrency = '';

    constructor(private potService: PotService) {
    }

    ngOnInit(): void {
        this.loadPots();
    }

    loadPots(): void {
        this.potInstances.set([]);
        this.loading.set(true);
        this.error.set(null);

        const currency = this.selectedCurrency !== ''
            ? this.selectedCurrency
            : undefined;

        this.potService.getPots(currency).subscribe({
            next: (response) => {
                this.potInstances.set(response.potInstances || []);
                this.totalValue.set(response.total);
                this.conversionRates.set(response.conversionRates || []);
                this.currencyOverviews.set(response.currencyTotalOverviews || []);
                this.responseDate.set(response.date);
                this.loading.set(false);
            },
            error: (error) => {
                console.error('Error loading pots:', error);
                this.error.set('An error occurred while loading pot accounts.');
                this.loading.set(false);
            }
        });
    }

    formatCurrency(value: number): { integer: string, decimal: string } {
        if (value === null || value === undefined) {
            return { integer: '0', decimal: '00' };
        }

        // Format to 2 decimal places and split by decimal point
        const formatted = value.toFixed(2);
        const parts = formatted.split('.');

        return {
            integer: parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ','),
            decimal: parts.length > 1 ? parts[1] : '00'
        };
    }

    getActivePotCount(): number {
        return this.potInstances()?.filter(pot => pot.isActive).length || 0;
    }

    onCurrencyChange(): void {
        this.loadPots();
    }
}
