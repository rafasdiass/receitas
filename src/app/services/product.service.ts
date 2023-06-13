import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3333';
  private createdProductId: string | null = null;

  constructor(private http: HttpClient) { }

  createProduct(productData: any): Observable<any> {
    const adjustedProductData = {
      ...productData,
      produto_id: null // Definir inicialmente como nulo
    };

    return this.http.post(`${this.apiUrl}/produto`, adjustedProductData).pipe(
      catchError(this.handleError),
      tap((response: any) => {
        console.log('Resposta do servidor:', response);
        const produto_id = response.id.replace("'", "");

        this.setCreatedProductId(produto_id);
        console.log('ID do produto setado:', produto_id);


      })
    );
  }

  getProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/produto`).pipe(
      catchError(this.handleError)
    );
  }

  getCreatedProductId(): string | null {
    return this.createdProductId;
  }

  setCreatedProductId(produto_id: string) {
    this.createdProductId = produto_id;
  }

  private handleError(error: any) {
    console.error('Ocorreu um erro:', error);
    return throwError(error);
  }
}
