import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  products: any[] = [];
  filteredProducts: any[] = [];

  searchText = '';

  selectedCategory = '';
  selectedBrand = '';
  minPrice = 0;
  maxPrice = 10000;
  minRating = 0;

  categories: string[] = [];
  brands: string[] = [];

  constructor(
    private http: HttpClient,
    public cartService: CartService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  goToProduct(id: number) {
    this.router.navigate(['/product', id]);
  }

  loadProducts() {
    this.http.get<any>('https://dummyjson.com/products')
      .subscribe({
        next: (res) => {

          const products = res?.products ?? [];

          this.products = [...products];

          this.categories = Array.from(new Set(products.map((p: any) => p.category)));
          this.brands = Array.from(new Set(products.map((p: any) => p.brand)));

          this.filteredProducts = [...products];

          this.cdr.detectChanges();

          console.log('HOME LOADED:', this.filteredProducts.length);
        },
        error: (err) => {
          console.error('API ERROR:', err);
        }
      });
  }

  applyFilters() {
    this.filteredProducts = this.products.filter(p =>
      p.title.toLowerCase().includes(this.searchText.toLowerCase()) &&
      (!this.selectedCategory || p.category === this.selectedCategory) &&
      (!this.selectedBrand || p.brand === this.selectedBrand) &&
      p.price >= this.minPrice &&
      p.price <= this.maxPrice &&
      p.rating >= this.minRating
    );
  }

  // 💥 ВОТ ТУТ ДОЛЖЕН БЫТЬ addToCart
  addToCart(product: any) {
    this.cartService.addToCart({
      _id: product.id,
      name: product.title,
      price: product.price,
      thumbnail: product.thumbnail, // ✅ картинка
      quantity: 1                   // ✅ количество
    });
  }
}