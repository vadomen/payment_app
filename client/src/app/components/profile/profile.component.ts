import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { UserApiService } from '../../services/api/user/user.api';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authentication/auth.service';
import { Subscription } from 'rxjs';
import { TelegramService } from '../../services/communication/telegram.service';
import { take } from 'rxjs/operators';
import { Telegram } from '../../interfaces/telegram.interface';

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit, OnDestroy {

    public userInfo: any = [];
    public userCards: any = [];
    public userSubscriptions: any = [];
    public subscriptionIds: string[] = [];

    public isLoading: boolean = false;

    constructor(private userService: UserApiService,
                private authService: AuthService,
                private telegramService: TelegramService,
                private router: Router,
                private cdr: ChangeDetectorRef) {
                }

    ngOnInit() {
        this.telegramService.subscribe(this, () => {
            this.cdr.markForCheck();
        });
        this.initProfile();
    }

    private initProfile() {
        this.isLoading = true;
        this.userService
            .getUser()
            .pipe(take(1))
            .subscribe(({payload : profile}) => {
                this.parseProfile(profile);
                this.isLoading = false;
                this.cdr.markForCheck();
        }, () => {
            this.signOut();
        });
    }

    private parseProfile(profileObj) {
        this.userInfo = profileObj.propsToDisplay;
        this.userCards = profileObj.sources;
        this.userSubscriptions = profileObj.subscriptions;
        this.subscriptionIds = this.userSubscriptions.data.map(sub => sub.id);
        this.checkSubsciptions();
    }

    private checkSubsciptions() {
        const telegram: Telegram = {
            PlansListComponent: {
                payload: {
                    checkSubcriptions: [this.userSubscriptions],
                    hasActiveCard: this.userCards.data.length > 0
                }
            }
        };
        this.telegramService.sendTelegram(telegram);
    }

    public signOut() {
        this.authService.deleteAuthorizationToken();
        this.router.navigate(['login']);
    }

    ngOnDestroy() {
        this.telegramService.unsubscribe(this);
    }

}
