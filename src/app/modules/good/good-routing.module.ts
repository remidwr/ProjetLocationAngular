import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Role } from '../auth/models/role.model';
import { CreateGoodComponent } from './components/create-good/create-good.component';
import { GetGoodsComponent } from './components/get-goods/get-goods.component';

const routes: Routes = [
  {
    path: 'annonces', 
    component: GetGoodsComponent
  },
  {
    path: 'ajoutannonce',
    component: CreateGoodComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.User, Role.Admin, Role.SuperAdmin] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GoodRoutingModule { }
