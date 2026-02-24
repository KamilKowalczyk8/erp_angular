import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CreateProductRequest } from '../../../core/models/product.model';

@Component({
  selector: 'app-add-product-dialog',
  standalone: false,
  templateUrl: './add-product-dialog.html',
  styleUrl: './add-product-dialog.scss',
})
export class AddProductDialog {

  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddProductDialog>
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      skuCode: ['', [Validators.required]],
      price: [0, [Validators.required, Validators.min(0.01)]],
      stockQuantity: [0, [Validators.required, Validators.min(0)]]
    });
  }

  onSave() {
    if (this.productForm.valid) {
      const newProduct: CreateProductRequest = this.productForm.value;
      this.dialogRef.close(newProduct);
    }
  }

  onCancel() {
    this.dialogRef.close(null);
  }
}
