import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { AuthGuard } from './modules/auth/guards/auth.guard';
import { FourOfourComponent } from './components/four-ofour/four-ofour.component';
import { GetAllUserComponent } from './modules/user/components/get-all-user/get-all-user.component';

const routes: Routes = [
  { path: 'home', component : HomeComponent },
  { path: 'about', component : AboutComponent },
  { path: 'users', component: GetAllUserComponent, canActivate: [AuthGuard] },
  { path: 'user', loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule), canActivate: [AuthGuard] },
  { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },

  { path: 'notFound', component: FourOfourComponent },
  { path: 'shared', loadChildren: () => import('./modules/shared/shared.module').then(m => m.SharedModule) },
  { path: '**', redirectTo: '/notFound'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
