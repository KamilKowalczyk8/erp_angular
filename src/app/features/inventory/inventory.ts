import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../core/services/inventory.service';
import { CreateProductRequest, Product } from '../../core/models/product.model';
import { MatDialog } from '@angular/material/dialog';
import { AddProductDialog } from './add-product-dialog/add-product-dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteConfirmDialog } from './delete-confirm-dialog/delete-confirm-dialog';
@Component({
  selector: 'app-inventory',
  standalone: false,
  templateUrl: './inventory.html',
  styleUrl: './inventory.scss',
})


export class Inventory implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'skuCode', 'price', 'stockQuantity', 'actions'];

  dataSource = new MatTableDataSource<Product>([]);

  constructor(
    private inventoryService: InventoryService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.inventoryService.getProducts(0, 20).subscribe({
      next: (pageData) => {
        this.dataSource.data = pageData.content;
        console.log('Pobrano produkty: ', this.dataSource);
      },
      error: (err) => {
        console.error('Błąd pobieranie produktów:', err)
      }
    });
  }

  openAddProductDialog() {
    const dialogRef = this.dialog.open(AddProductDialog);

    dialogRef.afterClosed().subscribe((result: CreateProductRequest) => {
      if (result) {
        this.inventoryService.createProduct(result).subscribe({
          next: () => {
            console.log('Produkt dodano');
            this.loadProducts();
          },
        })
      }
    })
  }

  changeStock(product: Product) {
    const quantityStr = prompt(`Zmień stan dla: ${product.name}...`);

    if (quantityStr) {
      const quantityChange = parseInt(quantityStr, 10);
      
      if (!isNaN(quantityChange)) {
        this.inventoryService.updateStock(product.id, quantityChange).subscribe({
          next: () => {
            console.log('Stan został zaktualizowany');
            this.loadProducts();
          }
        })
      }
    }
  }

  deleteProduct(product: Product) {
    const dialogRef = this.dialog.open(DeleteConfirmDialog, {
      width: '400px', 
      data: { productName: product.name } 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.inventoryService.deleteProduct(product.id).subscribe({
          next: () => {
            console.log("Produkt usunięty")
            this.loadProducts();
          },
          error: (err) => {
            console.error("Błąd usuwania:", err);
            alert('Wystąpił błąd podczas usuwania');
          }
        });
      }
    });

  }

}
