import { Injectable, signal, effect } from '@angular/core';
import { Configuration } from '../external/configuration';
import { Theme } from './theme';

@Injectable({
    providedIn: 'root'
})
export class ApplicationTheme {
    currentTheme = signal<Theme>('light');

    constructor(private configuration: Configuration) {
        this.currentTheme.set(this.configuration.theme);

        effect(() => {
            this.applyTheme(this.currentTheme());
        });
    }

    private applyTheme(theme: Theme): void {
        if (typeof document !== 'undefined') {
            document.documentElement.setAttribute('data-theme', theme);
        }
        
        this.configuration.theme = theme;
    }

    setTheme(theme: Theme): void {
        this.currentTheme.set(theme);
    }

    toggleTheme(): void {
        const current = this.currentTheme();
        let newTheme: Theme;
        
        switch (current) {
            case 'light':
                newTheme = 'dark';
                break;
            case 'dark':
                newTheme = 'cream';
                break;
            case 'cream':
                newTheme = 'light';
                break;
            default:
                newTheme = 'light';
        }
        
        this.currentTheme.set(newTheme);
    }
}
