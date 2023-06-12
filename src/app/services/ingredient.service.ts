import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  private apiUrl = 'http://localhost:3333'; // ajuste a URL conforme necessário

  constructor(private http: HttpClient) { }

  createIngredient(ingredientData: any): Observable<any> {
    // Gerar um nome de ingrediente único com base na hora atual
    const uniqueIngredientName = 'Ingrediente' + new Date().getTime();

    // Adicionar o nome do ingrediente único aos dados do ingrediente
    ingredientData = {...ingredientData, ingredient1: {...ingredientData.ingredient1, name: uniqueIngredientName}};

    return this.http.post(`${this.apiUrl}/ingredient`, ingredientData).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
