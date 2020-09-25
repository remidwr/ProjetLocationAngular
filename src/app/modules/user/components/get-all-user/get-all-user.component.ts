import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { UserSimple } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'user-get-all-user',
  templateUrl: './get-all-user.component.html',
  styleUrls: ['./get-all-user.component.scss']
})
export class GetAllUserComponent implements OnInit {
  users: UserSimple[];

  constructor(private _userService: UserService) { }

  ngOnInit(): void {
    this._userService.getAll().pipe(first()).subscribe(users => {
      this.users = users;
    })
  }

}
