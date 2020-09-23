import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private _router: Router,
    private _authService: AuthService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this._authService.currentUserValue;
    if (currentUser) {
        return true;
    }

    // not logged in so redirect to login page with the return url
    this._router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}