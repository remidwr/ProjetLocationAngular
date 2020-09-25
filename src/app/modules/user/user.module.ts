import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from '../user/components/user.component';
import { UserService } from './services/user.service';
import { GetAllUserComponent } from './components/get-all-user/get-all-user.component';
import { SharedModule } from '../shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    UserComponent,
    GetAllUserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ],
  providers: [
    UserService
  ]
})
export class UserModule { }
