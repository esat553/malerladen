import { Component, inject, OnInit, WritableSignal } from '@angular/core';
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

  ngOnInit() {
    this.productsService.fetchProducts();
  }

  openAddProductDialog() {
    const dialogRef = this.dialog.open(AddProductDialogComponent, {
      width: '500px',
      maxWidth: '80vw',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productsService.addProduct(result);
      }
    });
  }
  editProduct(_t25: {
    name: string;
    description: string;
    price: number;
    imagePath: string;
  }) {
    throw new Error('Method not implemented.');
  }

  removeItem(id: number) {
    this.productsService.deleteProduct(id);
  }

  debug() {
    this.productsService.fetchProducts();
  }
}
