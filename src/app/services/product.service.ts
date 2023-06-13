import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3333';
  private createdProductId: string | null = null;

  constructor(private http: HttpClient) { }

  createProduct(productData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/produto`, productData).pipe(
      catchError(this.handleError)
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
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
