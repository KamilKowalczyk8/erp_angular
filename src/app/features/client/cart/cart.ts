import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../../../core/services/cart';


@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart implements OnInit{

  cartItems: CartItem[] = [];
  totalPrice: number = 0;

  constructor(private cart: CartService) {}

  ngOnInit(): void {
    this.cart.cart$.subscribe({
      next: (items) => {
        this.cartItems = items;
        this.totalPrice = this.cart.getTotalPrice();
      }
    });
  }
  
  onClearCart(): void {
    console.log('Czyszczenie koszyka z poziomu widoku...');
    this.cart.clearCart();
  }

  checkout(): void {
    if (this.cartItems.length === 0) {
      alert('Twój koszyk jest pusty!');
      return;
    }

    console.log('Rozpoczynam proces składania zamówienia...');
    alert(`Zamówienie złożone! Do zapłaty: ${this.totalPrice} PLN`);
    this.cart.clearCart();
  }


}
