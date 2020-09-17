import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { UserRegister } from '../models/userRegister.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userReg: UserRegister;
  constructor(private httpClient: HttpClient) { }

  register(user: UserRegister) {
    return this.httpClient.post('https://localhost:5001/api/auth/register', user);
  }

  // login() {
  //   return new Promise(
  //     (resolve, reject) => {
  //       this.httpClient.post('https://localhost:5001/api/auth/register', UserLogin).then(
  //         () => {
  //           resolve();
  //         },
  //         (error) => {
  //           reject(error);
  //         }
  //       );
  //     }
  //   );
  // }
}
