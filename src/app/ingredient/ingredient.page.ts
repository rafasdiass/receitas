import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngredientService } from '../services/ingredient.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.page.html',
  styleUrls: ['./ingredient.page.scss'],
})
export class IngredientPage implements OnInit {

  ingredientForm: FormGroup = new FormGroup({});
  products: any[] = [];

  constructor(
    private ingredientService: IngredientService,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.initForm();
    this.loadProducts();
  }
  initForm() {
    this.ingredientForm = new FormGroup({
      productId1: new FormControl(null, Validators.required),
      ingredientUnity1: new FormControl(null, Validators.required),
      ingredientWeight1: new FormControl(null, Validators.required),
      productId2: new FormControl(null, Validators.required),
      ingredientUnity2: new FormControl(null, Validators.required),
      ingredientWeight2: new FormControl(null, Validators.required),
    });
  }

  loadProducts() {
    this.productService.getProducts().subscribe(
      (response: any) => {
        this.products = response;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  onSubmit() {
    if (this.ingredientForm.invalid) {
      console.log('Formulário inválido');
      return;
    }

    const formValue = this.ingredientForm.value;

    this.ingredientService.createIngredient({
      name: formValue.ingredientName,
      unity: formValue.ingredientUnity,
      weight: formValue.ingredientWeight,
      productId: formValue.productId
    }).subscribe(
      (response: any) => {
        console.log(response);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}
