import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { UserApiService } from '../../services/api/user/user.api';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authentication/auth.service';
import { Telegram } from '../../interfaces/telegram.interface';
import { TelegramService } from '../../services/communication/telegram.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

    constructor(private userService: UserApiService,
                private authService: AuthService,
                private router: Router,
                private telegramService: TelegramService) { }

    ngOnInit() {
        const token = this.authService.getAuthorizationToken();
        const userId = this.authService.getUserId();
        if (token && userId) {
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

    public openModal(modalToOpen: string) {
        const telegram: Telegram = {
            ModalWrapperComponent: {
                payload: {
                    openModal: modalToOpen,
                    modalHeader: 'Sign up',
                    successButton: 'Sign up',
                    disableSuccessButton : true
                }
            }
        };
        this.telegramService.sendTelegram(telegram);
    }

}
