import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './modules/auth/models/user.model';
import { AuthService } from './modules/auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentUser : User;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
  }

  logout() {
    console.log("test");
    this.authService.logout();
    this.router.navigate(['auth/login']);
  }
}
