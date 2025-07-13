import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-main-menu',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterLinkActive],
    templateUrl: './main-menu.html',
    styleUrl: './main-menu.scss'
})
export class MainMenu {
    menuItems = [
        { path: '/home', label: 'Home' },
        { path: '/pots', label: 'Pots' }
    ];
}
