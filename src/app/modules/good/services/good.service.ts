import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Good } from '../models/good.model';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../auth/services/auth.service';
import { Observable, throwError } from 'rxjs';
import { Section } from '../models/section.model';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class GoodService {
  token = "";

  private HttpOptions(token: string) {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    return options
  }

  constructor(
    private _http: HttpClient,
    private _authService: AuthService,
  ) {
    this._authService.user.subscribe(data => {
      if (data == null || data.token == null)
        return;
      this.token = data.token;
    })
  }

  getAll(): Observable<Good[]> {
    return this._http.get<Good[]>(`${environment.apiUrl}/good`)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  getOne(id): Observable<Good> {
    return this._http.get<Good>(`${environment.apiUrl}/good/${id}`, this.HttpOptions(this.token))
      .pipe(
        catchError(this.errorHandler)
      );
  }

  create(good): Observable<Good> {
    return this._http.post<Good>(`${environment.apiUrl}/good`, JSON.stringify(good), this.HttpOptions(this.token))
      .pipe(
        catchError(this.errorHandler)
      );
  }

  update(id, good): Observable<Good> {
    return this._http.put<Good>(`${environment.apiUrl}/good/${id}`, JSON.stringify(good), this.HttpOptions(this.token))
      .pipe(
        catchError(this.errorHandler)
      );
  }

  delete(id) {
    return this._http.delete<Good>(`${environment.apiUrl}/good/${id}`, this.HttpOptions(this.token))
      .pipe(
        catchError(this.errorHandler)
      );
  }

  getSection(): Observable<Section[]> {
    return this._http.get<Section[]>(`${environment.apiUrl}/section`);
  }

  getCategory(): Observable<Category[]> {
    return this._http.get<Category[]>(`${environment.apiUrl}/category`);
  }

  getCategoriesBySection(sectionId: number): Observable<Category[]> {
    return this._http.get<Category[]>(`${environment.apiUrl}/section/${sectionId}/categories`);
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
