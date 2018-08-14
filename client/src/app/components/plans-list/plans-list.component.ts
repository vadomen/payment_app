import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { PlanApiService } from '../../services/api/plan/plan.api.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SubscriptionApiService } from '../../services/api/subscription/subscription.api';
import { SetLoading, InitProfile } from '../../helpers/decorators/controllers.decorator';
import { TelegramService } from '../../services/communication/telegram.service';

@Component({
    selector: 'plans-list',
    templateUrl: './plans-list.component.html',
    styleUrls: ['./plans-list.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlansListComponent implements OnInit, OnDestroy {

    public subscribedPlans: {} = {};
    public loadingPlans: {} = {};
    public isLoading: boolean = false;
    public hasActiveCard: boolean = false;

    public $plans: Observable<Array<any>> | null = null;

    @SetLoading('ProfileComponent') private setLoading(value: boolean) { }
    @InitProfile() private initProfile() {}

    constructor(
                private planService: PlanApiService,
                private subscriptionService: SubscriptionApiService,
                private telegramService: TelegramService,
                private cdr: ChangeDetectorRef
            ) { }

    ngOnInit() {
        this.telegramService.subscribe(this, () => {
            this.cdr.markForCheck();
        });
        this.$plans = this.planService.getAllPlans().pipe(map(res => res.payload.data));
    }

    private checkSubcriptions(subscriptions: any) {
        this.subscribedPlans = subscriptions.data
            .reduce((acc, sub) => {
                acc[sub.plan.id] = true;
                delete this.loadingPlans[sub.plan.id];
                return acc;
            } , {});
    }

    public initSubscription(planId: string) {
        this.setLoading(true);
        this.subscriptionService.initSibscription(planId).subscribe(
            () => this.initProfile(),
            () => this.setLoading(false));
    }

    public trackByFn(index) {
        return index;
    }

    ngOnDestroy() {
        this.telegramService.unsubscribe(this);
    }
}
