import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserStoreService } from '../../services/user-store.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {

    public userInfo: string[] = [];
    public userCards: any[] = [];
    public userSubscriptions: any[] = [];

    constructor(private userService: UserService, 
                private authService: AuthService,
                private userStore: UserStoreService, 
                private router: Router) { }

    ngOnInit() {
        this.userService.getUser().subscribe(({payload : user}) => {
            this.userStore.setCurrentUser(user);
        }, err => {
            this.authService.deleteAuthorizationToken();
            this.router.navigate(['login']);
        })
    }

}
