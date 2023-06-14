import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root',
})
export class IngredientService {
  private apiUrl = 'http://localhost:3333';

  constructor(private http: HttpClient) {}

  createIngredient(ingredientData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/ingredient`, ingredientData).pipe(
      catchError(this.handleError),
      tap((response: any) => {
        console.log('Resposta do servidor:', response);
      })
    );
  }

  getIngredients(): Observable<any> {
    return this.http.get(`${this.apiUrl}/ingredient`).pipe(
      catchError(this.handleError),
      tap((response: any) => {
        console.log('Resposta do servidor:', response);
      })
    );
  }

  private handleError(error: any) {
    console.error('Ocorreu um erro:', error);
    return throwError(error);
  }
}
