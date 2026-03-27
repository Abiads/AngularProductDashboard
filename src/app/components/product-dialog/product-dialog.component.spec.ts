import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductDialogComponent } from './product-dialog.component';
import { Product } from '../../models/product.model';

describe('ProductDialogComponent', () => {
  let component: ProductDialogComponent;
  let fixture: ComponentFixture<ProductDialogComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<ProductDialogComponent>>;

  const mockProduct: Product = {
    id: '1',
    name: 'Test Product',
    category: 'Electronics',
    price: 99.99,
    stock: 50,
    status: 'In Stock',
    createdAt: new Date()
  };

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [ProductDialogComponent, NoopAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: null }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values when data is null', () => {
    expect(component.productForm.get('name')?.value).toBe('');
    expect(component.productForm.get('category')?.value).toBe('');
    expect(component.productForm.get('price')?.value).toBe(0);
    expect(component.productForm.get('stock')?.value).toBe(0);
    expect(component.productForm.get('status')?.value).toBe('In Stock');
  });

  it('should populate form when product data is provided', async () => {
    TestBed.resetTestingModule();
    
    await TestBed.configureTestingModule({
      imports: [ProductDialogComponent, NoopAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockProduct }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.productForm.get('name')?.value).toBe('Test Product');
    expect(component.productForm.get('category')?.value).toBe('Electronics');
    expect(component.productForm.get('price')?.value).toBe(99.99);
    expect(component.productForm.get('stock')?.value).toBe(50);
  });

  it('should have invalid form when required fields are empty', () => {
    component.productForm.patchValue({
      name: '',
      category: '',
      price: 0,
      stock: 0,
      status: ''
    });

    expect(component.productForm.valid).toBeFalsy();
  });

  it('should have valid form when all fields are filled correctly', () => {
    component.productForm.patchValue({
      name: 'Valid Product',
      category: 'Electronics',
      price: 99.99,
      stock: 50,
      status: 'In Stock'
    });

    expect(component.productForm.valid).toBeTruthy();
  });

  it('should close dialog with form value on save', () => {
    const formValue = {
      name: 'New Product',
      category: 'Test',
      price: 50,
      stock: 25,
      status: 'In Stock'
    };

    component.productForm.patchValue(formValue);
    component.onSave();

    expect(mockDialogRef.close).toHaveBeenCalledWith(formValue);
  });

  it('should not close dialog if form is invalid', () => {
    component.productForm.patchValue({
      name: '',
      category: '',
      price: -5,
      stock: -10,
      status: ''
    });

    component.onSave();

    expect(mockDialogRef.close).not.toHaveBeenCalled();
  });

  it('should validate price minimum value', () => {
    const priceControl = component.productForm.get('price');
    
    priceControl?.setValue(-10);
    expect(priceControl?.hasError('min')).toBeTruthy();
    
    priceControl?.setValue(50);
    expect(priceControl?.hasError('min')).toBeFalsy();
  });

  it('should validate stock minimum value', () => {
    const stockControl = component.productForm.get('stock');
    
    stockControl?.setValue(-5);
    expect(stockControl?.hasError('min')).toBeTruthy();
    
    stockControl?.setValue(10);
    expect(stockControl?.hasError('min')).toBeFalsy();
  });
});
