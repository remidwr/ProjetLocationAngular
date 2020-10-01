import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  SERVER_URL = 'https://file.io/?expires=1y';

  constructor(private _http: HttpClient) { }

  public upload(formData: any) {
    return this._http.post<any>(this.SERVER_URL, formData, {
      reportProgress: true,
      observe: 'events'
    })
  }
}
