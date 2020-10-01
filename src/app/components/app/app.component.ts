import { Component } from '@angular/core';
import { throwMatDialogContentAlreadyAttachedError } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Role } from 'src/app/modules/auth/models/role.model';
import { User } from '../../modules/auth/models/user.model';
import { AuthService } from '../../modules/auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  user: User;

  greet: string;
  myDate = new Date();
  hrs = this.myDate.getHours();

  constructor(private _router: Router, private _authService: AuthService) {
    this._authService.user.subscribe((x) => (this.user = x));
  }

  ngOnInit(): void { }

  get isAdmin() {
    return this.user && this.user.roleName === Role.Admin;
  }

  get isSuperAdmin() {
    return this.user && this.user.roleName === Role.SuperAdmin;
  }

  logout() {
    this._authService.logout();
    this._router.navigate(['auth/login']);
  }
}
