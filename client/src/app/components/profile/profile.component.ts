import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserStoreService } from '../../services/user-store.service';

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {

    // public userInfo: string[] = [];
    // public userCards: any[] = [];
    // public userSubscriptions: any[] = [];

    constructor(private userService: UserService, private userStore: UserStoreService) { }

    ngOnInit() {
        this.userService.getUser().subscribe(({payload : user}) => {
            console.log(user);
            this.userStore.setCurrentUser(user);
        })
    }

}
