import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ProductService } from './services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { signal, computed } from '@angular/core';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let productService: jasmine.SpyObj<ProductService>;
  let matDialog: jasmine.SpyObj<MatDialog>;
  let matSnackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductService', 
      ['addProduct', 'updateProduct', 'deleteProduct', 'getProductById'],
      { 
        products: signal([]),
        categories: signal([])
      }
    );
    
    const matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    const matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      imports: [AppComponent, NoopAnimationsModule],
      providers: [
        { provide: ProductService, useValue: productServiceSpy },
        { provide: MatDialog, useValue: matDialogSpy },
        { provide: MatSnackBar, useValue: matSnackBarSpy }
      ]
    }).compileComponents();

    productService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
    matDialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    matSnackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  it('should create', () => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should initialize with empty filters', () => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    
    expect(component.searchValue()).toBe('');
    expect(component.statusFilter()).toBe('');
    expect(component.categoryFilter()).toBe('');
  });

  it('should have displayedColumns defined', () => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    
    expect(component.displayedColumns).toContain('id');
    expect(component.displayedColumns).toContain('name');
    expect(component.displayedColumns).toContain('actions');
  });

  it('should call clearFilters and reset form', () => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    
    component.filterForm.setValue({ search: 'test', status: 'In Stock', category: 'Electronics' });
    component.clearFilters();
    
    expect(component.filterForm.get('search')?.value).toBe(null);
  });

  it('should call deleteProduct and show notification on confirmation', () => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
    spyOn(window, 'confirm').and.returnValue(true);
    
    const mockProduct = { 
      id: '1', 
      name: 'Test Product',
      category: 'Test',
      price: 99,
      stock: 10,
      status: 'In Stock' as const,
      createdAt: new Date()
    };
    
    component.deleteProduct(mockProduct);
    
    expect(window.confirm).toHaveBeenCalledWith('Are you sure you want to delete "Test Product"?');
    expect(productService.deleteProduct).toHaveBeenCalledWith('1');
  });

  it('should getStatusClass return correct color class', () => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    
    expect(component.getStatusClass('In Stock')).toBe('text-green-600');
    expect(component.getStatusClass('Out of Stock')).toBe('text-red-600');
  });
});
