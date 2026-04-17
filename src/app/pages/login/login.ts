
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  username = '';
  password = '';
  confirmPassword = '';

  mode: 'login' | 'register' = 'login';

  constructor(private router: Router) {}

  submit() {

    // 🔥 LOGIN
    if (this.mode === 'login') {

      if (this.username === 'admin' && this.password === '1234') {
        localStorage.setItem('auth', 'true');
        localStorage.setItem('user', this.username);

        this.router.navigate(['/home']);
      } else {
        alert('Wrong username or password');
      }

    }

    // 🔥 REGISTER
    else {

      if (!this.username || !this.password || !this.confirmPassword) {
        alert('Fill all fields');
        return;
      }

      if (this.password !== this.confirmPassword) {
        alert('Passwords do not match');
        return;
      }

      // fake register
      localStorage.setItem('auth', 'true');
      localStorage.setItem('user', this.username);

      this.router.navigate(['/home']);
    }
  }
}