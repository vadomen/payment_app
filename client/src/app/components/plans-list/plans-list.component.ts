import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { PlanApiService } from '../../services/api/plan/plan.api.service';
import { map } from 'rxjs/operators'
import { Observable, Subscription } from 'rxjs';
import { SubscriptionApiService } from '../../services/api/subscription/subscription.api';
import { SetLoading, InitProfile } from '../../helpers/decorators/controllers.decorator';
import { TelegramService } from '../../services/communication/telegram.service';
import { TelegramHandler } from '../../helpers/decorators/telegramHandler.decorator';

@TelegramHandler()
@Component({
    selector: 'plans-list',
    templateUrl: './plans-list.component.html',
    styleUrls: ['./plans-list.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlansListComponent implements OnInit, OnDestroy {

    @SetLoading('ProfileComponent') private setLoading(value: boolean) { }
    @InitProfile() private initProfile() {}

    private telegramSubscription: Subscription;
    public subscribedPlans: {} = {};
    
    constructor(
                private planService: PlanApiService,
                private subscriptionService: SubscriptionApiService,
                private telegramService: TelegramService,
                private cdr: ChangeDetectorRef
            ) { }

    public $plans: Observable<Array<any>> | null = null;

    ngOnInit() {
        this.$plans = this.planService.getAllPlans().pipe(map(res => res.payload.data));
    }

    private checkSubcription(subscriptions: any) {
        this.subscribedPlans = subscriptions.data
            .reduce((acc, sub) => { acc[sub.plan.id] = true; return acc } , {});
    }

    public initSubscription(planId: string) {
        this.setLoading(true);
        this.subscriptionService.initSibscription(planId).subscribe(
            () => this.initProfile(),
            err => this.setLoading(false));
    }

    public trackByFn(index) {
        return index;
    }

    ngOnDestroy() {
        
    }
}
