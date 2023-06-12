import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngredientService } from '../services/ingredient.service';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.page.html',
  styleUrls: ['./ingredient.page.scss'],
})
export class IngredientPage implements OnInit {

  ingredientForm: FormGroup = new FormGroup({});

  constructor(private ingredientService: IngredientService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.ingredientForm = new FormGroup({
      ingredientName: new FormControl(null, Validators.required),
      ingredientUnity: new FormControl(null, Validators.required),
      ingredientWeight: new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    if (this.ingredientForm.invalid) {
      console.log('Formulário inválido');
      return;
    }

    const formValue = this.ingredientForm.value;

    // create ingredient
    this.ingredientService.createIngredient({
      name: formValue.ingredientName,
      unity: formValue.ingredientUnity,
      weight: formValue.ingredientWeight
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
