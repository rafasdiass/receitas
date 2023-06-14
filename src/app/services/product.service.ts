import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3333';
  private createdProductId: string | null = null;

  constructor(private http: HttpClient) {}

  createProduct(productData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/product`, productData).pipe(
      catchError(this.handleError),
      tap((response: any) => {
        console.log('Resposta do servidor:', response);
      })
    );
  }

  getProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/product`).pipe(
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
