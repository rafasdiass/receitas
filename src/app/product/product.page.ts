import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { IngredientService } from '../services/ingredient.service';
import { AlertController } from '@ionic/angular';
import { ProductService } from '../services/product.service';
import { Ingredient } from '../ingredient/ingredient.model';
import { Product } from '../product/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  productForm!: FormGroup;
  ingredients: Ingredient[] = [];
  products: Product[] = [];
  createdProductId: string | null = null;

  constructor(
    private productService: ProductService,
    private ingredientService: IngredientService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.initForm();
    this.loadIngredients();
    this.loadProducts();
  }

  initForm() {
    this.productForm = new FormGroup({
      produto_id: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      unity: new FormControl(null, Validators.required),
      weight: new FormControl(null, Validators.required),
    });
  }

  async onSubmit() {
    if (this.productForm.invalid) {
      console.log('Formulário inválido');
      return;
    }

    const formValue = this.productForm.value;

    this.productService
      .createProduct({
        name: formValue.name,
        ingredientId: formValue.produto_id,
        unity: formValue.unity,
        weight: formValue.weight,
      })
      .subscribe(
        (response: Product) => {
          console.log(response);
          this.presentAlert('Produto criado com sucesso!');
          this.loadProducts();
        },
        (error: any) => {
          console.error(error);
        }
      );
  }

  loadIngredients() {
    this.ingredientService.getIngredients().subscribe(
      (response: Ingredient[]) => {
        this.ingredients = response;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  loadProducts() {
    this.productService.getProducts().subscribe((response: Product[]) => {
      this.products = response;
    });
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Aviso',
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
