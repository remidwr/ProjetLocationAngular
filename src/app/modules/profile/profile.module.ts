import { ToDateFR } from './pipes/todatefr.pipe';
import { ProfileService } from './services/profile.service';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { GetUserComponent } from './get-user/get-user.component';
import { LayoutComponent } from './layout/layout.component';
import { UserGoodListComponent } from './user-good-list/user-good-list.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';


@NgModule({
  declarations: [
    GetUserComponent,
    LayoutComponent,
    UserGoodListComponent,
    UserSettingsComponent,
    ToDateFR
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule
  ],
  providers: [
    ProfileService,
  ]
})
export class ProfileModule { }
