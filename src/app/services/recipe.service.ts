import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private apiUrl = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772';  // Substitua por sua URL de API real

  constructor(private http: HttpClient) { }

  getRecipes(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getRecipeDetails(id: string): Observable<any> {
    return this.http.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  }

  createRecipe(recipeData: any): Observable<any> {
    // Substitua a URL pela URL da sua API para criar receitas
    return this.http.post('https://yourapi.com/create-recipe', recipeData);
  }

  updateRecipe(id: string, recipeData: any): Observable<any> {
    // Substitua a URL pela URL da sua API para atualizar receitas
    return this.http.put(`https://yourapi.com/update-recipe/${id}`, recipeData);
  }
}
