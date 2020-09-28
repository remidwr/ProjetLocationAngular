import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Good } from '../models/good.model';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../auth/services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoodService {
  token = "";

  constructor(
    private _http: HttpClient,
    private _authService: AuthService,
  ) {
    this._authService.user.subscribe(data => {
      if (data == null || data.token == null) 
        return;
      this.token = data.token;
    }) }

  getAll() {
    return this._http.get<Good[]>(`${environment.apiUrl}/good`);
  }

  getOne() {

  }

  create(good: Good): Observable<any> {
    return this._http.post<Good>(`${environment.apiUrl}/good`, good, this.HttpOptions(this.token));
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
