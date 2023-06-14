import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { IngredientService } from '../services/ingredient.service';
import { AlertController } from '@ionic/angular';
import { ProductService } from '../services/product.service';
import { Ingredient } from '../ingredient/ingredient.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  productForm!: FormGroup;
  ingredients: Ingredient[] = [];
  createdProductId: string | null = null;

  constructor(
    private productService: ProductService,
    private ingredientService: IngredientService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.initForm();
    this.loadIngredients();
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
        (response: any) => {
          console.log(response);
          this.presentAlert('Produto criado com sucesso!'); // apresentar alerta
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

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Aviso',
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
