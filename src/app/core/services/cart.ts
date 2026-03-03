import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})

export class CartService {
  private readonly CART_KEY = 'client_cart';
  private items: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cartSubject.asObservable();

  constructor() {
    this.loadCartFromStorage();
  }

  private loadCartFromStorage(): void {
    const storedCart = localStorage.getItem(this.CART_KEY);
    if (storedCart) {
      try{
        this.items = JSON.parse(storedCart);
        this.cartSubject.next(this.items);
      } catch (e) {
        console.error('Błąd parsowania: ', e);
        this.items = [];
      }
    }
  }

  private syncWithStorage(): void {
    localStorage.setItem(this.CART_KEY, JSON.stringify(this.items));
    this.cartSubject.next(this.items);
  }

  addToCart(product: Product): void {
    const existingItem = this.items.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({ product, quantity: 1});
    }
    this.syncWithStorage();
  }

  getItems(): CartItem[] { return this.items; }

  clearCart(): void {
    this.items = [];
    this.syncWithStorage();
  }

  getTotalPrice(): number {
    return this.items.reduce((total, item) => total + (item.product.price * item.quantity) , 0);
  }
}
