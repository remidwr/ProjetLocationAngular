import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../modules/auth/models/user.model';
import { AuthService } from '../../modules/auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentUser : User;

  constructor(
    private _router: Router,
    private _authService: AuthService
  ) {
    this._authService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
  }

  logout() {
    this._authService.logout();
    this._router.navigate(['auth/login']);
  }
}
