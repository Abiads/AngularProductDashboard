import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  template: `
    <h2 mat-dialog-title>{{ data ? 'Edit Product' : 'Add Product' }}</h2>
    <mat-dialog-content>
      <form [formGroup]="productForm" class="flex flex-col gap-4 min-w-96">
        <mat-form-field appearance="outline">
          <mat-label>Name</mat-label>
          <input matInput formControlName="name" placeholder="Enter product name" aria-required="true">
          <mat-error *ngIf="productForm.get('name')?.invalid && productForm.get('name')?.touched">
            Name is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Category</mat-label>
          <input matInput formControlName="category" placeholder="Enter category" aria-required="true">
          <mat-error *ngIf="productForm.get('category')?.invalid && productForm.get('category')?.touched">
            Category is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Price</mat-label>
          <input matInput type="number" formControlName="price" placeholder="0.00" min="0" step="0.01" aria-required="true">
          <span matSuffix>$</span>
          <mat-error *ngIf="productForm.get('price')?.invalid && productForm.get('price')?.touched">
            Valid price is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Stock</mat-label>
          <input matInput type="number" formControlName="stock" placeholder="0" min="0" aria-required="true">
          <mat-error *ngIf="productForm.get('stock')?.invalid && productForm.get('stock')?.touched">
            Valid stock quantity is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Status</mat-label>
          <mat-select formControlName="status" aria-required="true">
            <mat-option value="In Stock">In Stock</mat-option>
            <mat-option value="Out of Stock">Out of Stock</mat-option>
          </mat-select>
          <mat-error *ngIf="productForm.get('status')?.invalid && productForm.get('status')?.touched">
            Status is required
          </mat-error>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end" class="gap-2">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-raised-button color="primary" [disabled]="productForm.invalid" (click)="onSave()">
        {{ data ? 'Update' : 'Add' }}
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    mat-dialog-content {
      min-width: 400px;
    }
  `]
})
export class ProductDialogComponent {
  private fb = inject(FormBuilder);
  public dialogRef = inject<MatDialogRef<ProductDialogComponent>>(MatDialogRef);

  productForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Product | null) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      category: ['', [Validators.required]],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      status: ['In Stock', [Validators.required]]
    });

    if (data) {
      this.productForm.patchValue(data);
    }
  }

  onSave(): void {
    if (this.productForm.valid) {
      this.dialogRef.close(this.productForm.value);
    }
  }
}