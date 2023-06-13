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
      produto_id: new FormControl(null, Validators.required),
      unity: new FormControl(null, Validators.required),
      weight: new FormControl(null, Validators.required),
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

    // Gerar um nome de ingrediente único com base na hora atual
    const uniqueIngredientName = 'Ingrediente' + new Date().getTime();

    this.ingredientService.createIngredient({
      produto_id: formValue.produto_id,
      unity: formValue.unity,
      weight: formValue.weight,
      ingredient: {
        name: uniqueIngredientName
      }
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
