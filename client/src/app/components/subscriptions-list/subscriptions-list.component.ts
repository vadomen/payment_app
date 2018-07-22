import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { SubscriptionService } from '../../services/api/subscription/subscription.service';
import { TelegramService } from '../../services/communication/telegram.service';
import { Telegram } from '../../interfaces/telegram';

@Component({
    selector: 'subscriptions-list',
    templateUrl: './subscriptions-list.component.html',
    styleUrls: ['./subscriptions-list.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubscriptionsListComponent implements OnInit {

    @Input('subscriptions') public subscriptions: any;
    
    constructor(private subscriptionService: SubscriptionService,
                private telegramService: TelegramService) { }

    ngOnInit() {
    }

    public trackByFn(index, item) {
        return index;
    }

    public initSubscription() {
        this.subscriptionService.initSibscription().subscribe(
            res => this.initProfile(),
            err => console.log(err));
    }

    private initProfile() {
        let telegram: Telegram = { 
            ProfileComponent: {
                payload: {
                    initProfile: []
                }
            }
        };

        this.telegramService.sendTelegram(telegram);
    }

}
