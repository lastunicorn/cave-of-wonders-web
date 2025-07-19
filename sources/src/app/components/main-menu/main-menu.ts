import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ThemeService, Theme } from '../../services/theme.service';

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

    constructor(public themeService: ThemeService) {}

    onThemeChange(event: Event): void {
        const target = event.target as HTMLSelectElement;
        this.themeService.setTheme(target.value as Theme);
    }
}
