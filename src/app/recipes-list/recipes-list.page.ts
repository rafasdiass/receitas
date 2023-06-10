import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.page.html',
  styleUrls: ['./recipes-list.page.scss'],
})
export class RecipesListPage implements OnInit {

  recipes: any[] = [];

  constructor(
    private router: Router,
    private recipeService: RecipeService
  ) { }

  ngOnInit() {
    this.loadRecipes();
  }

  loadRecipes() {
    this.recipeService.getRecipes().subscribe(
      (response) => {
        console.log(response);
        this.recipes = response.meals; // Agora usamos response.meals para acomodar a estrutura de dados retornada pela API
      },
      (error) => {
        console.error(error);
      }
    );
  }

  openDetails(id: number) {
    this.router.navigateByUrl('/recipe-details/' + id);
  }

  createRecipe() {
    this.router.navigateByUrl('/recipe-editor');
  }
}
