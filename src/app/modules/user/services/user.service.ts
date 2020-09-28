import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

import { UserSimple } from '../models/user.model';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  token = "";

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

  getAll() {
    return this._http.get<UserSimple[]>(`${environment.apiUrl}/user`, this.HttpOptions(this.token));
  }

  private HttpOptions(token: string){
    let options = {
      headers: new HttpHeaders({
        Authorization:'Bearer '+ token
      })
    };
    return options
  }
}
