import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  private _authorId: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private apiUrl = 'http://localhost:3333'; // Adicione sua URL da API aqui

  constructor(private http: HttpClient) { }

  setAuthorId(id: string): void {
    this._authorId.next(id);
  }

  getAuthorId(): Observable<string> {
    return this._authorId.asObservable();
  }

  createAuthor(authorData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/author`, authorData).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
