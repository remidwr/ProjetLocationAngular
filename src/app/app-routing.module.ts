import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { AuthGuard } from './modules/auth/guards/auth.guard';
import { Role } from './modules/auth/models/role.model';
import { FourOfourComponent } from './components/four-ofour/four-ofour.component';
import { SchematicsComponent } from './components/schematics/schematics.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'schematics',
    component: SchematicsComponent
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'annonce',
    loadChildren: () => import('./modules/good/good.module').then(m => m.GoodModule)
  },
  {
    path: 'profil',
    loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule),
    // canActivate: [AuthGuard],
    // data: { roles: [Role.User, Role.Admin, Role.SuperAdmin] }
  },
  {
    path: 'user',
    loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin, Role.SuperAdmin] }
  },
  {
    path: 'notFound',
    component: FourOfourComponent
  },
  {
    path: '**',
    redirectTo: '/notFound'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
