import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Theme } from '../services/theme';

@Injectable({
    providedIn: 'root'
})
export class Configuration {
    private readonly THEME_KEY = 'cave-of-wonders-theme';
    private readonly isBrowser: boolean;

    constructor(@Inject(PLATFORM_ID) platformId: object) {
        this.isBrowser = isPlatformBrowser(platformId);
    }

    get theme(): Theme {
        if (!this.isBrowser) {
            return 'light';
        }

        const stored = localStorage.getItem(this.THEME_KEY);
        return (stored === 'dark' || stored === 'light' || stored === 'cream')
            ? stored
            : 'light';
    }

    set theme(value: Theme) {
        if (!this.isBrowser) {
            return;
        }

        localStorage.setItem(this.THEME_KEY, value);
    }
}
