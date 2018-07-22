import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { UserService } from '../../services/api/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authentication/auth.service';

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {

    public userInfo: any[] = [];
    public userCardsObj: any;
    public userSubscriptionsObj: any;

    constructor(private userService: UserService, 
                private authService: AuthService,
                private router: Router,
                private cdr: ChangeDetectorRef) { }

    ngOnInit() {
        this.userService.getUser().subscribe(({payload : user}) => {
            this.assignProperties(user);
            this.cdr.detectChanges();
        }, err => {
            this.signOut();
        })
    }

    private assignProperties(user){
        Object.keys(user).forEach(key => {
            switch (true) {
                case !!key.match(/subscriptions/gi):
                    this.userSubscriptionsObj = user[key];
                    break;

                case !!key.match(/paymentMethods/gi):
                    this.userCardsObj = user[key].cards;
                    break;

                default:
                    this.userInfo.push({key, value: user[key]});
                    break;
            }
        });
    }

    public signOut() {
        this.authService.deleteAuthorizationToken();
        this.router.navigate(['login']);
    }

}
