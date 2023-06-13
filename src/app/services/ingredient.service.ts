import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  private apiUrl = 'http://localhost:3333';

  constructor(private http: HttpClient, private productService: ProductService) { }

  createIngredient(ingredientData: any): Observable<any> {
    const uniqueIngredientName = 'Ingrediente' + new Date().getTime();
    const produto_id = this.productService.getCreatedProductId();
    console.log('produto_id:', produto_id);

    const adjustedIngredientData = {
      ...ingredientData,
      ingredient: {
        ...ingredientData.ingredient,
        name: uniqueIngredientName,
        produto_id: produto_id
      }
    };

    return this.http.post(`${this.apiUrl}/ingredient`, adjustedIngredientData).pipe(
      catchError(this.handleError),
      tap((response: any) => {
        console.log('Resposta do servidor:', response);
        console.log('Todos os atributos no objeto de resposta:');
        for (let key in response) {
          console.log(`Atributo: ${key}, Valor: ${response[key]}`);
        }
      })
    );
  }

  private handleError(error: any) {
    console.error('Ocorreu um erro:', error);
    return throwError(error);
  }
}
