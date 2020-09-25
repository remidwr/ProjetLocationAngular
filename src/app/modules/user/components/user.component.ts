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

  constructor() { }

  ngOnInit(): void {
  }



}
