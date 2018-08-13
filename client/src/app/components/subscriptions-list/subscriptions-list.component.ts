import { Component, OnInit, Input, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { SubscriptionApiService } from '../../services/api/subscription/subscription.api';
import { TelegramService } from '../../services/communication/telegram.service';
import { SetLoading, InitProfile } from '../../helpers/decorators/controllers.decorator';

@Component({
    selector: 'subscriptions-list',
    templateUrl: './subscriptions-list.component.html',
    styleUrls: ['./subscriptions-list.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubscriptionsListComponent implements OnInit {
    @Input('subscriptionIds') private subscriptionIds: string[];
    @Input('subscriptions') public subscriptions: any;

    @SetLoading('ProfileComponent') private setLoading(value: boolean) { }
    @InitProfile() private initProfile() {}

    constructor(private subscriptionService: SubscriptionApiService,
                private telegramService: TelegramService) { }

    ngOnInit() { }

    public suspendSubscription(subId: string | string[]) {
        this.setLoading(true);
        this.subscriptionService.suspendSubscription(subId).subscribe(
                () => this.initProfile(),
                () => this.setLoading(false)
            );
    }

    public trackByFn(index) {
        return index;
    }
}
