import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { UserSimple } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'user-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  loading = false;
  users: UserSimple[];

  constructor(private _userService: UserService) { }

  ngOnInit(): void {
    this.loading = true;
    this._userService.getAll().pipe(first()).subscribe(users => {
      this.loading = false;
      this.users = users;
    })
  }



}
