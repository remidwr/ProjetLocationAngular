import { Role, UserFull, UserInfo } from './../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
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

  getOne(id: number): Observable<UserFull> {
    return this._http.get<UserFull>(`${environment.apiUrl}/user/${id}`, this.HttpOptions(this.token))
      .pipe(
        catchError(this.errorHandler)
      );
  }

  getRole(id: number): Observable<Role> {
    return this._http.get<Role>(`${environment.apiUrl}/user/${id}/role`, this.HttpOptions(this.token))
      .pipe(
        catchError(this.errorHandler)
      );
  }

  updateAddress(id: number, user: UserFull): Observable<UserInfo> {
    console.log(user);
    return this._http.put<UserInfo>(`${environment.apiUrl}/user/${id}`, JSON.stringify(user), this.HttpOptions(this.token))
      .pipe(
        catchError(this.errorHandler)
      );
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
