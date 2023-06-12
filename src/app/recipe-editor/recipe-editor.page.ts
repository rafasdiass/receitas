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
      recipeTitle: new FormControl(null, Validators.required),
      recipeDescription: new FormControl(null, Validators.required),
      recipeTime: new FormControl(null, Validators.required),
      recipeDifficulty: new FormControl(null, Validators.required),
      recipeDishType: new FormControl(null, Validators.required),
      recipeAdditionalFeatures: new FormControl(null),
      recipeTotalGuests: new FormControl(null, Validators.required),
      authorName: new FormControl(null, Validators.required),
      productName: new FormControl(null, Validators.required),
      ingredientName: new FormControl(null, Validators.required),
      productDescription: new FormControl(null, Validators.required),
      ingredientUnity: new FormControl(null, Validators.required),
      ingredientWeight: new FormControl(null, Validators.required),
      authorWhatsapp: new FormControl(null, Validators.required),
    });
  }

  loadRecipe(id: string) {
    this.recipeService.getRecipeDetails(id).subscribe(
      (response) => {
        const recipe = response.meals[0];
        this.recipeForm.setValue({
          recipeTitle: recipe.strMeal,
          recipeDescription: recipe.strDescription,
          recipeTime: recipe.strTime,
          recipeDifficulty: recipe.strDifficulty,
          recipeDishType: recipe.strDishType,
          recipeAdditionalFeatures: recipe.strAdditionalFeatures,
          recipeTotalGuests: recipe.strTotalGuests
          // fill other fields as needed
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

    const formValue = this.recipeForm.value;

    // create author
    this.recipeService.createAuthor({ name: formValue.authorName, whatsapp: formValue.authorWhatsapp }).subscribe(authorResponse => {
      const authorId = authorResponse.id; // assuming the response has the author ID

      // create product
      this.recipeService.createProduct({ name: formValue.productName, description: formValue.productDescription }).subscribe(productResponse => {
        const productId = productResponse.id; // assuming the response has the product ID

        // create ingredient with the product id
        this.recipeService.createIngredient({
          produto_id: productId,
          unity: formValue.ingredientUnity,
          weight: formValue.ingredientWeight
        }).subscribe(ingredientResponse => {
          const ingredientId = ingredientResponse.id; // assuming the response has the ingredient ID

          // create or update recipe
          if (this.editMode) {
            this.recipeService.updateRecipe(this.recipeId as string, {
              name: formValue.recipeTitle,
              description: formValue.recipeDescription,
              time: formValue.recipeTime,
              difficulty: formValue.recipeDifficulty,
              dish_type: formValue.recipeDishType,
              additional_features: formValue.recipeAdditionalFeatures,
              total_guests: formValue.recipeTotalGuests,
              author_id: authorId,
              ingredients: [ingredientId]
            }).subscribe(
              (response) => {
                console.log(response);
                this.router.navigateByUrl('/recipes-list');
              },
              (error) => {
                console.error(error);
              }
            );
          } else {
            this.recipeService.createRecipe({
              name: formValue.recipeTitle,
              description: formValue.recipeDescription,
              time: formValue.recipeTime,
              difficulty: formValue.recipeDifficulty,
              dish_type: formValue.recipeDishType,
              additional_features: formValue.recipeAdditionalFeatures,
              total_guests: formValue.recipeTotalGuests,
              author_id: authorId,
              ingredients: [ingredientId]
            }).subscribe(
              (response) => {
                console.log(response);
                this.router.navigateByUrl('/recipes-list');
              },
              (error) => {
                console.error(error);
              }
            );
          }
        });
      });
    });
  }

  goBack() {
    this.router.navigateByUrl('/recipes-list');
  }
}
