import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../../../core/services/cart';
import { CreateOrderDto, CreateOrderItemDto } from '../../../core/models/order.model';
import { OrderService } from '../../../core/services/order';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart implements OnInit{

  cartItems: CartItem[] = [];
  totalPrice: number = 0;

  constructor(
    private cart: CartService,
    private orderService: OrderService
  ) {}

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

    console.log('Przygotowuję paczkę danych dla Spring Boota...');

    const itemsForBackend: CreateOrderItemDto[] = this.cartItems.map(item => ({
      productId: item.product.id,
      quantity: item.quantity
    }));

    const orderPayload: CreateOrderDto = {
      items: itemsForBackend
    }

    this.orderService.placeOrder(orderPayload).subscribe({
      next: (orderId) => {
        console.log('Sukces! ID zamówienia z bazy to:', orderId);
        alert(`Udało się! Twoje zamówienie (Numer: ${orderId}) zostało przyjęte do realizacji.`);
        
        this.cart.clearCart();
      },
      error: (err) => {
        if (err.status === 401 || err.status === 403) {
          alert('Sesja wygasła. Zaloguj się ponownie, aby złożyć zamówienie.');
        } else {
          alert('Przepraszamy, coś poszło nie tak po stronie serwera. Spróbuj ponownie za chwilę.');
        }
      }
    })
  }


}
