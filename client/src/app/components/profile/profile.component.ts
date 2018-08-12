import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { UserApiService } from '../../services/api/user/user.api';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authentication/auth.service';
import { Subscription } from 'rxjs';
import { TelegramService } from '../../services/communication/telegram.service';
import { TelegramHandler } from '../../helpers/decorators/telegramHandler.decorator';
import { take } from 'rxjs/operators';
import { Telegram } from '../../interfaces/telegram.interface';

@TelegramHandler()
@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit, OnDestroy {

    private profileSubscription: Subscription;
    private telegramSubscription: Subscription;

    public userInfo: any[] = [];
    public userCards: any[] = [];
    public userSubscriptions: any[] = [];

    public isLoading: boolean = false;

    constructor(private userService: UserApiService,
                private authService: AuthService,
                private telegramService: TelegramService,
                private router: Router,
                private cdr: ChangeDetectorRef) {
                }

    ngOnInit() {
        this.initProfile();
    }

    private initProfile() {
        this.isLoading = true;
        this.profileSubscription = this.userService
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
        this.checkSubsciptions();
    }

    private checkSubsciptions() {
        const telegram: Telegram = {
            PlansListComponent: {
                payload: {
                    checkSubcription: [this.userSubscriptions]
                }
            }
        };
    
        this.telegramService.sendTelegram(telegram);
    }

    public signOut() {
        this.authService.deleteAuthorizationToken();
        this.router.navigate(['login']);
    }

    ngOnDestroy() { }

}
