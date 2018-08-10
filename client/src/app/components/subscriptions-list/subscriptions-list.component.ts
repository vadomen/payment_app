import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { SubscriptionApiService } from '../../services/api/subscription/subscription.api';
import { TelegramService } from '../../services/communication/telegram.service';
import { Telegram } from '../../interfaces/telegram.interface';

@Component({
    selector: 'subscriptions-list',
    templateUrl: './subscriptions-list.component.html',
    styleUrls: ['./subscriptions-list.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubscriptionsListComponent implements OnInit {

    @Input('subscriptions') public subscriptions: any;
    constructor(private subscriptionService: SubscriptionApiService,
                private telegramService: TelegramService) { }

    ngOnInit() {
    }

    public trackByFn(index, item) {
        return index;
    }

    public initSubscription() {
        this.setLoading(true);
        this.subscriptionService.initSibscription().subscribe(
            () => this.initProfile(),
            err => this.setLoading(false));
    }

    public suspendSubscription() {
        this.setLoading(true);
        this.subscriptionService.suspendSubscription((this.subscriptions.data[0].id)).subscribe(
            () => this.initProfile(),
            err => this.setLoading(false));
    }

    private initProfile() {
        const telegram: Telegram = {
            ProfileComponent: {
                payload: {
                    initProfile: []
                }
            }
        };

        this.telegramService.sendTelegram(telegram);
    }

    private setLoading(value: boolean) {
        const telegram: Telegram = {
            ProfileComponent: {
                payload: {
                    isLoading: value,
                }
            }
        };
        this.telegramService.sendTelegram(telegram);
    }

}
