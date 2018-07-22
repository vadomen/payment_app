import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'card-creator',
  templateUrl: './card-creator.component.html',
  styleUrls: ['./card-creator.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardCreatorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
