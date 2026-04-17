import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: any[] = [];

  getCart() {
    return this.cart;
  }

  addToCart(product: any) {
    const item = this.cart.find(p => p._id === product._id || p.name === product.name);

    if (item) {
      item.quantity += 1;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
  }

  removeFromCart(product: any) {
    this.cart = this.cart.filter(p =>
      p._id !== product._id && p.name !== product.name
    );
  }

  increase(product: any) {
    product.quantity++;
  }

  decrease(product: any) {
    if (product.quantity > 1) {
      product.quantity--;
    } else {
      this.removeFromCart(product);
    }
  }

  getCount(): number {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  getTotal(): number {
    return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

}