import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../../core/services/inventory.service';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-storefront',
  standalone: false,
  templateUrl: './storefront.html',
  styleUrl: './storefront.scss',
})
export class Storefront implements OnInit{

  products: Product[] = [];

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.inventoryService.getProducts(0, 20).subscribe({
      next: (pageData) => {
        this.products = pageData.content;
        console.log('Pobrano produkty: ', this.products);
      },
      error: (err) => {
        console.error('Błąd pobieranie produktów:', err)
      }
    });
  }

  addToCart(product: Product): void {
    console.log('Kliknięto Kup dla:', product.name);
    alert(`Dodano produkt ${product.name} do koszyka!`);
  }
}
