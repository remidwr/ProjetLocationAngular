import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({ 
    providedIn: 'root' 
})
export class AuthService {
    private _currentUserSubject : BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this._currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this._currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this._currentUserSubject.value;
    }

    register(firstName: string, lastName: string, birthdate: Date, email: string, passwd : string): Observable<any>  {
        return this.http.post(`${environment.apiUrl}/api/auth/register`, { firstName, lastName, birthdate, email, passwd });
      }

    login(email: string, passwd: string) {
        return this.http.post<any>(`${environment.apiUrl}/api/auth/login`, { email, passwd })
            .pipe(map(user => {
            if (user && user.token) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                this._currentUserSubject.next(user);
            }
            return user;
        }))
    }

    logout() {
        localStorage.removeItem('currentUser');
        this._currentUserSubject.next(null);
    }
}