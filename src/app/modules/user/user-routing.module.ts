import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Role } from '../auth/models/role.model';

import { GetAllUserComponent } from './components/get-all-user/get-all-user.component';

const routes: Routes = [
  { 
    path: 'users',
    component: GetAllUserComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin, Role.SuperAdmin] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
