import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Good } from '../../models/good.model';
import { GoodService } from '../../services/good.service';

@Component({
  selector: 'good-get-goods',
  templateUrl: './get-goods.component.html',
  styleUrls: ['./get-goods.component.scss']
})
export class GetGoodsComponent implements OnInit {
  goods: Good[] = [];

  constructor(
    private _goodService: GoodService
  ) { }

  ngOnInit(): void {
    this._goodService.getAll().subscribe({
      next: dataFromService => this.goods = dataFromService,
      error: error => console.log(error.message)
    })
  }

}
