import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
