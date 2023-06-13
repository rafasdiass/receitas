import { UserProfileService } from './../services/userprofile.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-creator',
  templateUrl: './recipe-creator.page.html',
  styleUrls: ['./recipe-creator.page.scss'],
})
export class RecipeCreatorPage implements OnInit {
  recipeForm!: FormGroup;
  author_id!: string;

  constructor(
    private recipeService: RecipeService,
    private userProfileService: UserProfileService
  ) {}

  ngOnInit() {
    this.initForm();
    this.userProfileService.getAuthorId().subscribe(id => {
      this.author_id = id;
      this.recipeForm.get('author_id')?.setValue(this.author_id);
    });
  }

  initForm() {
    this.recipeForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'time': new FormControl(null, Validators.required),
      'difficulty': new FormControl(null, Validators.required),
      'dish_type': new FormControl(null, Validators.required),
      'additional_features': new FormControl(null),
      'total_guests': new FormControl(null, Validators.required),
      'author_id': new FormControl(null, Validators.required),
      'ingredients': new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    if (!this.recipeForm.valid) {
      return;
    }

    this.recipeService.createRecipe(this.recipeForm.value).subscribe(response => {
      console.log('Recipe created successfully');
    }, error => {
      console.error('An error occurred while creating the recipe', error);
    });
  }
}
