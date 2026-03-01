import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirm-dialog',
  templateUrl: './delete-confirm-dialog.html',
  styleUrls: ['./delete-confirm-dialog.scss'], 
  standalone: false
})
export class DeleteConfirmDialog {

  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { productName: string } 
  ) {}

  onCancel(): void {
    this.dialogRef.close(false); 
  }

  onConfirm(): void {
    this.dialogRef.close(true); 
  }
}