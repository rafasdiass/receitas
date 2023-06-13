
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { UserProfileService } from './userprofile.service'; // Import UserProfileService

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiUrl = 'http://localhost:3333';

  constructor(
    private http: HttpClient,
    private UserProfileService: UserProfileService  // Inject UserProfileService
  ) { }

  getRecipes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/recipe`).pipe(
      catchError(this.handleError)
    );
  }

  getRecipeDetails(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/description/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  createRecipe(recipeData: any): Observable<any> {
    return this.UserProfileService.getAuthorId().pipe(
      switchMap((author_id) => {
        recipeData.author_id = author_id;  // Set author_id from UserProfileService
        return this.http.post(`${this.apiUrl}/recipe`, recipeData);
      }),
      catchError(this.handleError)
    );
  }

  updateRecipe(id: string, recipeData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/recipe/${id}`, recipeData).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
