import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service'; // ✅ ВАЖНО

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css'
})
export class ProductDetails implements OnInit {

  product: any = null;
  loading = true;

  // ⭐ ОТЗЫВЫ
  reviews: any[] = [];
  reviewText = '';
  rating = 0;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private cartService: CartService // ✅ ВАЖНО
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    console.log('📦 PRODUCT ID:', id);

    if (id) {
      this.loadProduct(id);
    }
  }

  loadProduct(id: string) {
    this.loading = true;

    this.http.get<any>(`https://dummyjson.com/products/${id}`)
      .subscribe({
        next: (res) => {

          console.log('✅ PRODUCT LOADED:', res);

          this.product = res;
          this.loading = false;

          this.cdr.detectChanges();
        },
        error: (err) => {
          console.log('❌ ERROR:', err);
          this.loading = false;
          this.cdr.detectChanges();
        }
      });
  }

  // 💥 ДОБАВИТЬ В КОРЗИНУ
  addToCart() {
    if (!this.product) return;

    this.cartService.addToCart({
      _id: this.product.id,
      name: this.product.title,
      price: this.product.price,
      thumbnail: this.product.thumbnail,
      quantity: 1
    });
  }

  // ⭐ ОТПРАВКА ОТЗЫВА
  submitReview() {

    if (!this.reviewText || this.rating === 0) return;

    const newReview = {
      name: 'User',
      text: this.reviewText,
      rating: this.rating
    };

    this.reviews.push(newReview);

    this.reviewText = '';
    this.rating = 0;
  }
}