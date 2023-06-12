import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from '../services/recipe.service';
import { IonButton } from '@ionic/angular';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.page.html',
  styleUrls: ['./recipes-list.page.scss'],
})
export class RecipesListPage implements OnInit {
  @ViewChild('testButton', { static: false }) testButton!: IonButton; // Adicione o modificador !

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
        this.recipes = response.meals;
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
    console.log("create recipe sendo chamado");
    this.router.navigate(['/recipe-editor', '']);
  }

  // testFunction() {
  //   console.log("Testar Componente clicado!");

  //   if (this.testButton) {
  //     console.log("Botão de teste encontrado!");
  //   } else {
  //     console.log("Botão de teste não encontrado!");
  //   }
  // }
}
