import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  productForm!: FormGroup;
  createdProductId: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.productForm = this.formBuilder.group({
      productName: [null, Validators.required],
      productDescription: [null, Validators.required]
    });
  }

  onSubmit() {
    if (this.productForm.invalid) {
      console.log('Invalid form');
      return;
    }

    const formValue = this.productForm.value;

    // Create product
    this.productService.createProduct({
      name: formValue.productName,
      description: formValue.productDescription
    }).subscribe(
      (response: any) => {
        this.createdProductId = response.id;
        this.productService.setCreatedProductId(response.id);
        console.log('Produto h. ID:', response.id);
      },
      (error: any) => {
        console.error('Erro ao criar o produto:', error);
      }
    );
  }
}
