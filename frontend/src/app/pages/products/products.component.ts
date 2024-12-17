import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { NavComponent } from '../../components/nav/nav.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Product } from '../../interfaces/Product.interface';
import { ProductsService } from '../../services/productsService/products.service';
import { MatDialog } from '@angular/material/dialog';
import { AddProductDialogComponent } from '../../components/add-product-dialog/add-product-dialog.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    NavComponent,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonToggleModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  private productsService = inject(ProductsService);
  private dialog = inject(MatDialog);
  products: WritableSignal<Product[]> = this.productsService.getProductsList();
  filteredProducts: WritableSignal<Product[]> =
    this.productsService.getProductsList();
  searchTerm: string = '';

  ngOnInit() {
    this.productsService.fetchProducts();
  }

  searchProducts(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.searchTerm = searchTerm;

    if (!searchTerm) {
      this.filteredProducts = this.products;
      return;
    }

    const filtered = this.products().filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );

    this.filteredProducts = signal(filtered);
  }

  openAddProductDialog() {
    const dialogRef = this.dialog.open(AddProductDialogComponent, {
      width: '500px',
      maxWidth: '80vw',
      disableClose: true,
      data: { isEdit: false },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productsService.addProduct(result);
      }
    });
  }
  editProduct(product: Product) {
    const dialogRef = this.dialog.open(AddProductDialogComponent, {
      width: '500px',
      maxWidth: '80vw',
      disableClose: true,
      data: { isEdit: true, product },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productsService.editProduct(product.id, result.product);
      }
    });
  }

  removeItem(id: number) {
    this.productsService.deleteProduct(id);
  }

  debug() {
    this.productsService.fetchProducts();
  }
}
