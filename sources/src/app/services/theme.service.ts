import { Injectable, signal, effect, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'light' | 'dark';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private readonly THEME_KEY = 'cave-of-wonders-theme';
    private isBrowser: boolean;

    // Signal to track current theme
    currentTheme = signal<Theme>('light');

    constructor(@Inject(PLATFORM_ID) platformId: object) {
        this.isBrowser = isPlatformBrowser(platformId);
        
        // Set the initial theme after determining if we're in browser
        this.currentTheme.set(this.getStoredTheme());
        
        // Effect to apply theme changes to the document
        effect(() => {
            this.applyTheme(this.currentTheme());
        });
    }

    private getStoredTheme(): Theme {
        if (!this.isBrowser) {
            return 'light'; // Default theme for SSR
        }
        
        const stored = localStorage.getItem(this.THEME_KEY);
        return (stored === 'dark' || stored === 'light')
            ? stored
            : 'light';
    }

    private applyTheme(theme: Theme): void {
        if (!this.isBrowser) {
            return; // Skip DOM manipulation during SSR
        }
        
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(this.THEME_KEY, theme);
    }

    setTheme(theme: Theme): void {
        this.currentTheme.set(theme);
    }

    toggleTheme(): void {
        const newTheme = this.currentTheme() === 'light'
            ? 'dark'
            : 'light';
        this.setTheme(newTheme);
    }
}
