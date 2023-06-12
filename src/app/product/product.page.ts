import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  productForm: FormGroup = new FormGroup({});
  createdProductId: string | null = null; // Variável para armazenar o ID do produto criado

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.productForm = new FormGroup({
      productName: new FormControl(null, Validators.required),
      productDescription: new FormControl(null, Validators.required),
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
        this.createdProductId = response.id; // Atribui o ID do produto criado à variável
        console.log(response);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}
