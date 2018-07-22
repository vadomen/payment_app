import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { UserService } from '../../services/api/user/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authentication/auth.service';
import { Subscription } from 'rxjs';
import { TelegramService } from '../../services/communication/telegram.service';
import { TelegramHandler } from '../../interfaces/telegramHandler';
import { Telegram } from '../../interfaces/telegram';

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent extends TelegramHandler implements OnInit, OnDestroy {

    private profileSubscription: Subscription;
    private telegramSubscription: Subscription;

    public userInfo: any[] = [];
    public userCards: any[] = [];
    public userSubscriptions: any[] = [];

    public isLoading: boolean = false;

    constructor(private userService: UserService, 
                private authService: AuthService,
                private telegramService: TelegramService,
                private router: Router,
                private cdr: ChangeDetectorRef) { 
                    super();
                }

    ngOnInit() {
        this.telegramSubscription = this.telegramService.receiveTelegram().subscribe((telegram: Telegram) => {
            this.handleTelegram(telegram);
            this.cdr.detectChanges();
		}, err => console.log(err));
        this.initProfile();
    }

    private initProfile() {
        this.isLoading = true;
        this.unsubsribe();
        this.profileSubscription = this.userService.getUser().subscribe(({payload : profile}) => {
            console.log(profile);
            this.parseProfile(profile);
            this.isLoading = false;
            this.cdr.detectChanges();
        }, err => {
            this.signOut();
        })
    }

    private parseProfile(profileObj){
        this.userSubscriptions = profileObj.subscriptions;
        this.userCards = profileObj.sources;
        this.userInfo = profileObj.propsToDisplay;
    }

    public signOut() {
        this.authService.deleteAuthorizationToken();
        this.router.navigate(['login']);
    }

    private unsubsribe() {
        if(this.profileSubscription) {
            this.profileSubscription.unsubscribe();
        }
        this.profileSubscription = null;
    }

    ngOnDestroy() {
        this.unsubsribe();
        this.telegramSubscription.unsubscribe();
        this.telegramSubscription = null;
    }

}
