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
    const user = this._authService.userValue;
    if (user) {
      if (route.data.roles && route.data.roles.indexOf(user.roleName) === -1) {
        this._router.navigate(['/home']);
        return false;
      }

      return true;
    }

    this._router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}