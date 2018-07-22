import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
