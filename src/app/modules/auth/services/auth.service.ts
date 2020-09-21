import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({ 
    providedIn: 'root' 
})
export class AuthService {
    private currentUserSubject : BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    register(user: User): Observable<any>  {
        return this.http.post(`${environment.apiUrl}/api/auth/register`, user);
      }

    login(Email: string, Passwd: string) {
        console.log("test service start")
        return this.http.post<any>(`${environment.apiUrl}/api/auth/login`, { Email, Passwd })
        .pipe(map(user => {
            console.log(user)
            if (user && user.token) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                console.log("Test entre service");
            }
            console.log("test service end")
            return user;
        }))
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}