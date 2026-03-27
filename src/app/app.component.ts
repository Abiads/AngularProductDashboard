import { Component, OnInit, ViewChild, ChangeDetectionStrategy, inject, computed, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from './models/product.model';
import { ProductService } from './services/product.service';
import { ProductDialogComponent } from './components/product-dialog/product-dialog.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    ReactiveFormsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  private productService = inject(ProductService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  private fb = inject(FormBuilder);

  displayedColumns: string[] = ['id', 'name', 'category', 'price', 'stock', 'status', 'actions'];
  dataSource = new MatTableDataSource<Product>();

  // Signals for filter state
  searchValue = signal('');
  statusFilter = signal('');
  categoryFilter = signal('');

  // Computed signals
  statuses = signal(['In Stock', 'Out of Stock']);
  categories = computed(() => this.productService.categories());

  // Reactive form for filters
  filterForm: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    this.filterForm = this.fb.group({
      search: [''],
      status: [''],
      category: ['']
    });

    // React to form changes
    this.filterForm.valueChanges.subscribe(values => {
      this.searchValue.set(values.search || '');
      this.statusFilter.set(values.status || '');
      this.categoryFilter.set(values.category || '');
      this.applyFilter();
    });

    // Use effect to react to products changes
    effect(() => {
      this.dataSource.data = this.productService.products();
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = this.createFilter();
  }

  private createFilter(): (data: Product, filter: string) => boolean {
    return (data: Product, filter: string): boolean => {
      const searchTerms = filter.toLowerCase().split('|');
      const searchTerm = searchTerms[0] || '';
      const statusFilter = searchTerms[1] || '';
      const categoryFilter = searchTerms[2] || '';

      const matchesSearch = !searchTerm ||
        data.name.toLowerCase().includes(searchTerm) ||
        data.category.toLowerCase().includes(searchTerm);

      const matchesStatus = !statusFilter || data.status === statusFilter;
      const matchesCategory = !categoryFilter || data.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    };
  }

  applyFilter(): void {
    const filterValue = `${this.searchValue()}|${this.statusFilter()}|${this.categoryFilter()}`;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  clearFilters(): void {
    this.filterForm.reset();
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '500px',
      data: null,
      ariaLabel: 'Add new product'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.addProduct(result);
        this.snackBar.open('Product added successfully', 'Close', { duration: 3000 });
      }
    });
  }

  openEditDialog(product: Product): void {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '500px',
      data: product,
      ariaLabel: 'Edit product'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.updateProduct(product.id, result);
        this.snackBar.open('Product updated successfully', 'Close', { duration: 3000 });
      }
    });
  }

  deleteProduct(product: Product): void {
    if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
      this.productService.deleteProduct(product.id);
      this.snackBar.open('Product deleted successfully', 'Close', { duration: 3000 });
    }
  }

  getStatusClass(status: string): string {
    return status === 'In Stock' ? 'text-green-600' : 'text-red-600';
  }
}
