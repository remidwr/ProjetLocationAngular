import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GetUserComponent } from './get-user/get-user.component';

const routes: Routes = [
  {
    path: 'monprofil',
    component: GetUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
