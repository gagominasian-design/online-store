import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Cart } from './pages/cart/cart';
import { Login } from './pages/login/login';
import { ProductDetails } from './pages/product-details/product-details';
export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // 🔥 Home
  { path: 'home', component: Home, data: { reuse: false } },

  // 🛒 Cart
  { path: 'cart', component: Cart },

  // 🔐 Login
  { path: 'login', component: Login },

   { path: 'product/:id', component: ProductDetails },
   
  // fallback
  { path: '**', redirectTo: 'home' }
];