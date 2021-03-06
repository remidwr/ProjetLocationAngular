import { Component, OnDestroy, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Good } from '../../models/good.model';
import { GoodService } from '../../services/good.service';

@Component({
  selector: 'good-get-goods',
  templateUrl: './get-goods.component.html',
  styleUrls: ['./get-goods.component.scss']
})
export class GetGoodsComponent implements OnInit, OnDestroy {
  goods: Good[] = [];
  public response: { dbPath: '' };

  public resourceUrl = environment.ressourceUrl;

  constructor(
    private _goodService: GoodService
  ) { }

  ngOnInit(): void {
    this._goodService.getAll()
      .pipe(first())
      .subscribe({
        next: dataFromService => {
          this.goods = dataFromService;
          this.goods.forEach(x => this._goodService.getUserByGood(x.id)
            .pipe(first())
            .subscribe({
              next: dataFromService => this.goods[x.id].userPicture = dataFromService.picture
              ,
              error: error => console.log(error.message)
            }))
        },
        error: error => console.log(error.message)
      })


  }

  ngOnDestroy(): void {
    console.log('Component destroyed');
  }

  public uploadFinished = (event => {
    this.response = event;
  })

}
