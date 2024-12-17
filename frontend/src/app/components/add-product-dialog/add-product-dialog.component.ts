import { Component, inject } from '@angular/core';
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

  productForm: FormGroup;
  selectedImageUrl: string | null = null;

  constructor() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      image: [''],
    });
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
      this.dialogRef.close(product);
    }
  }
}
