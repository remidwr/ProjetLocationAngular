import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from '../modules/auth/services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private _authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if ([401, 403].indexOf(err.status) !== -1) {
                this._authService.logout();
            }
            else if (err.status === 0) {
                const error = "Le serveur est déconnecté"
                return throwError(error);
            }

            const error = err.error.detail || err.error.message;
            return throwError(error);
        }))
    }
}