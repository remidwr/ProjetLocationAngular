import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface ImageInfo {
  link: string;
}

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private images: object[] = [];
  private url: string = 'https://api.imgur.com/3/image';
  private clientId: string = '3d4fd2dca27c965';
  imagelink: any;

  constructor(private _http: HttpClient) { }

  public upload(formData) {
    let header = new HttpHeaders({
      "authorization": 'Client-ID ' + this.clientId,
    });

    return this._http.post<any>(this.url, formData, {
      headers: header,
      reportProgress: true,
      observe: 'events'
    });
  }

  //////////
  async uploadImage(imageFile: File): Promise<string> {
    let formData = new FormData();
    formData.append('image', imageFile, imageFile.name);

    let header = new HttpHeaders({
      "authorization": 'Client-ID ' + this.clientId,
    });

    const imageData = await this._http.post(this.url, formData, {
      headers: header,
      reportProgress: true
    }).toPromise();

    this.imagelink = imageData['data'].link;

    let newImageObject: ImageInfo = {
      link: this.imagelink
    };

    this.images.unshift(newImageObject);

    return this.imagelink;
  }

  getImage() {
    return this.images;
  }
}
