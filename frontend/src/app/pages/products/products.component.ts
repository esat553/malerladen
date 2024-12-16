import { Component } from '@angular/core';
import { NavComponent } from '../../components/nav/nav.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

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
export class ProductsComponent {
  openAddProductDialog() {
    throw new Error('Method not implemented.');
  }
  editProduct(_t25: {
    name: string;
    description: string;
    price: number;
    imagePath: string;
  }) {
    throw new Error('Method not implemented.');
  }
  removeItem(index: number) {
    throw new Error('Method not implemented.');
  }
  products = [
    {
      name: 'Product 1',
      description: 'Description 1',
      price: 10.99,
      imagePath: 'https://via.placeholder.com/150',
    },
    {
      name: 'Product 2',
      description: 'Description 2',
      price: 15.49,
      imagePath: 'https://via.placeholder.com/150',
    },
    {
      name: 'Product 3',
      description: 'Description 3',
      price: 30,
      imagePath: 'https://via.placeholder.com/150',
    },
  ];
}
