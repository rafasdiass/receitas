import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { IngredientService } from '../services/ingredient.service';
import { Ingredient } from '../ingredient/ingredient.model';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.page.html',
  styleUrls: ['./ingredient.page.scss'],
})
export class IngredientPage implements OnInit {
  ingredientForm: FormGroup = new FormGroup({});
  ingredients: Ingredient[] = [];

  constructor(
    private ingredientService: IngredientService,
    private formBuilder: FormBuilder,
    private alertController: AlertController // injetar AlertController
  ) {}

  ngOnInit() {
    this.initForm();
    this.loadIngredients();
  }

  initForm() {
    this.ingredientForm = this.formBuilder.group({
      productName: [null, Validators.required],
      productDescription: [null, Validators.required],
    });
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

  onSubmit() {
    if (this.ingredientForm.invalid) {
      console.log('Invalid form');
      return;
    }

    const formValue = this.ingredientForm.value;

    // Create product
    this.ingredientService
      .createIngredient({
        name: formValue.productName,
        description: formValue.productDescription,
      })
      .subscribe(
        (response: Ingredient) => {
          console.log(response);
          this.presentAlert('Ingrediente criado com sucesso!'); // apresentar alerta
          this.ingredientForm.reset(); // limpar o formulário
          this.loadIngredients(); // recarregar a lista de ingredientes
        },
        (error: any) => {
          console.error('Erro ao criar o ingrediente:', error);
        }
      );
  }

  // função para apresentar alerta
  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Aviso',
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
