import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApplicationTheme } from '../../services/application-theme.service';
import { Theme } from '../../services/theme';

@Component({
    selector: 'app-main-menu',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule],
    templateUrl: './main-menu.html',
    styleUrl: './main-menu.scss'
})
export class MainMenu {
    menuItems = [
        { path: '/home', label: 'Home' },
        { path: '/pots', label: 'Pots' }
    ];

    constructor(public applicationTheme: ApplicationTheme) {}

    onThemeChange(event: Event): void {
        const target = event.target as HTMLSelectElement;
        this.applicationTheme.setTheme(target.value as Theme);
    }
}
