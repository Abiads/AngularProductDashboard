import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly STORAGE_KEY = 'products';

  // Use signals for state management
  private _products = signal<Product[]>([]);
  public products = this._products.asReadonly();

  // Computed signal for categories
  public categories = computed(() => {
    const uniqueCategories = [...new Set(this._products().map(p => p.category))];
    return uniqueCategories.sort();
  });

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      const products = JSON.parse(stored).map((p: any) => ({
        ...p,
        createdAt: new Date(p.createdAt)
      }));
      this._products.set(products);
    } else {
      // Initialize with sample data
      const sampleProducts: Product[] = [
        {
          id: '1',
          name: 'iPhone 15',
          category: 'Electronics',
          price: 999,
          stock: 50,
          status: 'In Stock',
          createdAt: new Date()
        },
        {
          id: '2',
          name: 'MacBook Pro',
          category: 'Electronics',
          price: 1999,
          stock: 25,
          status: 'In Stock',
          createdAt: new Date()
        },
        {
          id: '3',
          name: 'Coffee Maker',
          category: 'Appliances',
          price: 79,
          stock: 0,
          status: 'Out of Stock',
          createdAt: new Date()
        }
      ];
      this._products.set(sampleProducts);
      this.saveToStorage(sampleProducts);
    }
  }

  private saveToStorage(products: Product[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(products));
  }

  addProduct(product: Omit<Product, 'id' | 'createdAt'>): void {
    const currentProducts = this._products();
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    const updatedProducts = [...currentProducts, newProduct];
    this._products.set(updatedProducts);
    this.saveToStorage(updatedProducts);
  }

  updateProduct(id: string, updates: Partial<Product>): void {
    const currentProducts = this._products();
    const updatedProducts = currentProducts.map(p =>
      p.id === id ? { ...p, ...updates } : p
    );
    this._products.set(updatedProducts);
    this.saveToStorage(updatedProducts);
  }

  deleteProduct(id: string): void {
    const currentProducts = this._products();
    const updatedProducts = currentProducts.filter(p => p.id !== id);
    this._products.set(updatedProducts);
    this.saveToStorage(updatedProducts);
  }

  getProductById(id: string): Product | undefined {
    return this._products().find(p => p.id === id);
  }
}