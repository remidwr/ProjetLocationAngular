import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({ 
    providedIn: 'root' 
})
export class AuthService {
    private _userSubject : BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(
        private _http: HttpClient,
        private _router : Router
    ) {
        this._userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this._userSubject.asObservable();
    }

    public get userValue(): User {
        return this._userSubject.value;
    }

    register(firstName: string, lastName: string, birthdate: Date, email: string, passwd : string): Observable<any>  {
        return this._http.post(`${environment.apiUrl}/auth/register`, { firstName, lastName, birthdate, email, passwd });
      }

    login(email: string, passwd: string) {
        return this._http.post<any>(`${environment.apiUrl}/auth/login`, { email, passwd })
            .pipe(map(user => {
                localStorage.setItem('user', JSON.stringify(user));
                this._userSubject.next(user);
                return user;
            }));
    }

    logout() {
        localStorage.removeItem('user');
        this._userSubject.next(null);
        this._router.navigate(['/auth/login']);
    }
}