import { Component, signal } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('hangszercsere');

menu: 'none' | 'login' | 'register' = 'none';

openMenu(type: 'login' | 'register') {
  this.menu = type;
}

closeMenu() {
  this.menu = 'none';
}

}
