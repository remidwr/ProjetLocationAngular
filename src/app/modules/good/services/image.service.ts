import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

// interface ImageInfo {
//   title: string;
//   description: string;
//   link: string;
// }

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private images: object[] = [];
  private url: string = 'https://api.imgur.com/3/image';
  private clientId: string = '3d4fd2dca27c965';
  imagelink: any;

  constructor(private _http: HttpClient) { }

  async uploadImage(imageFile: File/*, infoObject: {}*/): Promise<string> {
    let formData = new FormData();
    formData.append('image', imageFile, imageFile.name);

    let header = new HttpHeaders({
      "authorization": 'Client-ID ' + this.clientId,
    });

    const imageData = await this._http.post(this.url, formData, { headers: header }).toPromise();

    return this.imagelink = imageData['data'].link;

    // let newImageObject: ImageInfo = {
    //   title: infoObject["title"],
    //   description: infoObject["description"],
    //   link: this.imagelink
    // };

    // this.images.unshift(this.imagelink);
  }

  getImage() {
    return this.images;
  }
}
