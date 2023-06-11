import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private apiUrl = 'http://localhost:3333';

  constructor(private http: HttpClient) { }

  getRecipes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/recipes`).pipe(
      catchError(error => {
        console.error('An error occurred:', error);
        return throwError(error);
      })
    );
  }

  getRecipeDetails(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/recipes/${id}`);
  }

  createRecipe(recipeData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/recipes`, recipeData);
  }

  updateRecipe(id: string, recipeData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/recipes/${id}`, recipeData);
  }
}
