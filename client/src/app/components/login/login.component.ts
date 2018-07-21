import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

    constructor(private userService: UserService, private authService: AuthService, private router: Router) { }

    ngOnInit() {
        const token = this.authService.getAuthorizationToken();
        const userId = this.authService.getUserId();
        if(token && userId) {
            this.navigateToProfile(userId);
        }
    }

    private navigateToProfile(userId: string) {
        this.router.navigate(['/profile'], { queryParams: { id: userId } });
    }

    public signIn(credentials: {login: string, password: string}) {
        this.userService.signInUser(credentials)
            .subscribe(
                ({payload}) => {
                    this.authService.setAuthorizationToken(payload.id, payload.token);
                    this.navigateToProfile(payload.id);
                },
                err => console.log(err));
    }

}
