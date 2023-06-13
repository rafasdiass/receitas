import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
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

    ingredientData = {
      ...ingredientData,
      ingredient: {
        ...ingredientData.ingredient,
        name: uniqueIngredientName,
        produto_id: produto_id
      }
    };

    return this.http.post(`${this.apiUrl}/ingredient`, ingredientData).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
