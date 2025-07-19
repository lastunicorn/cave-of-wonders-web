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
        const newTheme: Theme = this.chooseNextTheme(current);
        this.currentTheme.set(newTheme);
    }

    private chooseNextTheme(current: Theme): Theme {
        switch (current) {
            case 'light':
                return 'dark';
            case 'dark':
                return 'cream';
            case 'cream':
                return 'light';
            default:
                return 'light';
        }
    }
}
