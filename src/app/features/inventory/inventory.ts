import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../core/services/inventory.service';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-inventory',
  standalone: false,
  templateUrl: './inventory.html',
  styleUrl: './inventory.scss',
})


export class Inventory implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'skuCode', 'price', 'stockQuantity'];

  dataSource: Product[] = [];

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.inventoryService.getProducts(0, 20).subscribe({
      next: (pageData) => {
        this.dataSource = pageData.content;
        console.log('Pobrano produkty: ', this.dataSource);
      },
      error: (err) => {
        console.error('Błąd pobieranie produktów:', err)
      }
    });
  }

}
