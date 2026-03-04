import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; 
import { InventoryService } from '../../../core/services/inventory.service';
import { Product } from '../../../core/models/product.model';
import { CartService } from '../../../core/services/cart';

@Component({
  selector: 'app-storefront',
  standalone: false,
  templateUrl: './storefront.html',
  styleUrl: './storefront.scss',
})
export class Storefront implements OnInit {

  products: Product[] = [];

  cartItemCount: number = 0;

  constructor(
    private inventoryService: InventoryService,
    private cart: CartService,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    this.loadProducts();

    this.cart.cart$.subscribe(items => {
      this.cartItemCount = items.reduce((total, item) => total + item.quantity, 0)
    })
  }

  loadProducts() {
    this.inventoryService.getProducts(0, 20).subscribe({
      next: (pageData: any) => { 

        if (Array.isArray(pageData)) {
          this.products = pageData;
        } else if (pageData && pageData.content) {
          this.products = pageData.content;
        } else {
          this.products = [];
        }

        console.log('Faktyczna tablica wędrująca do HTML-a: ', this.products);

        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Błąd pobierania produktów:', err)
      }
    });
  }

  addToCart(product: Product): void {
    this.cart.addToCart(product);
    console.log('Aktualny stan koszyka:', this.cart.getItems());
    alert(`Dodano produkt ${product.name} do koszyka!`);
  }
}