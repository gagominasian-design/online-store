import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  constructor(public cartService: CartService) {}

  isAuth() {
    return !!localStorage.getItem('auth');
  }

  getUserName() {
    return localStorage.getItem('user');
  }

  logout() {
    localStorage.removeItem('auth');
    localStorage.removeItem('user');
    window.location.href = '/home';
  }
}