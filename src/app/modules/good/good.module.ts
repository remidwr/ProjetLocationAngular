import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoodRoutingModule } from './good-routing.module';
import { GetGoodsComponent } from './components/get-goods/get-goods.component';
import { GoodService } from './services/good.service';
import { SharedModule } from '../shared/shared.module';
import { CreateGoodComponent } from './components/create-good/create-good.component';


@NgModule({
  declarations: [
    GetGoodsComponent,
    CreateGoodComponent
  ],
  imports: [
    CommonModule,
    GoodRoutingModule,
    SharedModule
  ],
  providers: [
    GoodService,
  ]
})
export class GoodModule { }
