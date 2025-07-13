import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PotList } from './components/pot-list/pot-list';
import { MainMenu } from './components/main-menu/main-menu';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PotList, MainMenu],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'pot-viewer';
}
