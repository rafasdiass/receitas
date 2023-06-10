import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
})
export class RecipeDetailsPage implements OnInit {

  recipe: any;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.loadRecipeDetails(id);
    }
  }

  loadRecipeDetails(id: string) {
    this.recipeService.getRecipeDetails(id).subscribe(
      (response) => {
        this.recipe = response.meals[0];
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
