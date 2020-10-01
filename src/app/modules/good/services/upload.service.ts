import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  SERVER_URL = 'https://file.io/';

  constructor(private _http: HttpClient) { }

  // tslint:disable-next-line: typedef
  public upload(formData: any) {
    return this._http.post<any>(this.SERVER_URL, formData, {
      reportProgress: true,
      observe: 'events'
    })
  }
}
