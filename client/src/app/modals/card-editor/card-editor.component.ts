import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'card-editor',
  templateUrl: './card-editor.component.html',
  styleUrls: ['./card-editor.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardEditorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
