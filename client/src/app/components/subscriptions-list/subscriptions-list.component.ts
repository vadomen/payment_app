import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'subscriptions-list',
    templateUrl: './subscriptions-list.component.html',
    styleUrls: ['./subscriptions-list.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubscriptionsListComponent implements OnInit {

    @Input('subscriptions') public subscriptions: any;
    constructor() { }

    ngOnInit() {
        console.log(this.subscriptions);
    }

}
