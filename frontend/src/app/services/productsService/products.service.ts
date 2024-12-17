import { Injectable, inject, signal } from '@angular/core';
import { Product } from '../../interfaces/Product.interface';
import { ApiService } from '../apiService/api.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private api = inject(ApiService);
  products = signal<Product[]>([]);

  fetchProducts() {
    this.api.get<Product[]>('/products').subscribe({
      next: (data) => this.products.set(data),
      error: (err) => console.error('Error fetching products:', err),
    });
  }

  addProduct(product: Omit<Product, 'id'>) {
    this.api.post<Product>('/products', product).subscribe({
      next: (newProduct) => {
        this.products.update((products) => [...products, newProduct]);
      },
      error: (err) => console.error('Error adding product:', err),
    });
  }

  editProduct(id: number, product: Omit<Product, 'id'>) {
    this.api.put<Product>(`/products/${id}`, product).subscribe({
      next: (updatedProduct) => {
        this.products.update((products) =>
          products.map((p) => (p.id === id ? updatedProduct : p))
        );
      },
      error: (err) => console.error('Error updating product:', err),
    });
  }

  getProductsList() {
    return this.products;
  }
}
