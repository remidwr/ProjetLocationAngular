import { UserFull } from './../models/user.model';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { ProfileService } from './../services/profile.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'profile-get-user',
  templateUrl: './get-user.component.html',
  styleUrls: ['./get-user.component.scss']
})
export class GetUserComponent implements OnInit, OnDestroy {
  user: UserFull = null;

  constructor(
    private _profileService: ProfileService,
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    this._profileService.getOne(this._authService.userValue.id).subscribe({
      next: dataFromService => this.user = dataFromService,
      error: error => console.log(error.message)
    })
  }

  ngOnDestroy(): void {
    console.log('Component destroyed');
  }
}
