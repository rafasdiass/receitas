import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiUrl = 'http://localhost:3333';

  constructor(private http: HttpClient) { }

  getRecipes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/recipe`).pipe(
      tap((response: any) => console.log(response)),
      catchError(this.handleError)
    );
  }

  getRecipeDetails(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/description/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  createRecipe(recipeData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/recipe`, recipeData).pipe(
      catchError(this.handleError)
    );
  }

  updateRecipe(id: string, recipeData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/recipe/${id}`, recipeData).pipe(
      catchError(this.handleError)
    );
  }

  createAuthor(authorData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/author`, authorData).pipe(
      catchError(this.handleError)
    );
  }

  createProduct(productData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/produto`, productData).pipe(
      catchError(this.handleError)
    );
  }

  createIngredient(ingredientData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/ingredient`, ingredientData).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
