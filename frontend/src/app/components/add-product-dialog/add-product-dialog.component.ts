import { Component, inject, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../../interfaces/Product.interface';
import { DialogData } from '../../interfaces/DialogData.interface';

@Component({
  selector: 'app-add-product-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  templateUrl: './add-product-dialog.component.html',
  styleUrl: './add-product-dialog.component.scss',
})
export class AddProductDialogComponent {
  private dialogRef = inject(MatDialogRef<AddProductDialogComponent>);
  private fb = inject(FormBuilder);

  isEdit = false;
  product?: Product;

  productForm: FormGroup;
  selectedImageUrl: string | null = null;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.isEdit = data.isEdit;
    this.productForm = this.fb.group({
      name: [data.product?.name || '', Validators.required],
      description: [data.product?.description || '', Validators.required],
      price: [
        data.product?.price || '',
        [Validators.required, Validators.min(0)],
      ],
      image: [data.product?.imagePath || ''],
    });

    if (data.product?.imagePath) {
      this.selectedImageUrl = data.product.imagePath;
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImageUrl = URL.createObjectURL(file);
      this.productForm.patchValue({
        image: this.selectedImageUrl,
      });
    }
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const product = {
        ...this.productForm.value,
        imagePath: this.selectedImageUrl,
      };
      this.dialogRef.close({ isEdit: this.isEdit, product });
    }
  }
}
