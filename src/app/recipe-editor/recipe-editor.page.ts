import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-editor',
  templateUrl: './recipe-editor.page.html',
  styleUrls: ['./recipe-editor.page.scss'],
})
export class RecipeEditorPage implements OnInit {

  recipeForm: FormGroup = new FormGroup({});
  editMode = false;
  recipeId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) { }

  ngOnInit() {
    this.recipeId = this.route.snapshot.paramMap.get('id');
    this.editMode = this.recipeId !== null;
    this.initForm();
    if (this.editMode) {
      this.loadRecipe(this.recipeId as string);
    }
  }

  initForm() {
    this.recipeForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      ingredients: new FormControl(null, Validators.required),
      instructions: new FormControl(null, Validators.required)
    });
  }

  loadRecipe(id: string) {
    this.recipeService.getRecipeDetails(id).subscribe(
      (response) => {
        const recipe = response.meals[0];
        this.recipeForm.setValue({
          title: recipe.strMeal,
          ingredients: recipe.strIngredient1,
          instructions: recipe.strInstructions
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onSubmit() {
    if (this.recipeForm.invalid) {
      console.log('Formulário inválido');
      return;
    }

    if (this.editMode) {
      this.recipeService.updateRecipe(this.recipeId as string, this.recipeForm.value).subscribe(
        (response) => {
          console.log(response);
          this.router.navigateByUrl('/recipes-list');
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      this.recipeService.createRecipe(this.recipeForm.value).subscribe(
        (response) => {
          console.log(response);
          this.router.navigateByUrl('/recipes-list');
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  goBack() {
    this.router.navigateByUrl('/recipes-list');
  }
}
