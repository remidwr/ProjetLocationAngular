import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-four-ofour',
  templateUrl: './four-ofour.component.html',
  styleUrls: ['./four-ofour.component.scss'],
})
export class FourOfourComponent implements OnInit, OnDestroy {
  constructor() { }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    console.log('Component destroyed');
  }
}
