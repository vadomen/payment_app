import { Component, OnInit, ChangeDetectionStrategy, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Telegram } from '../../interfaces/telegram';
import { TelegramService } from '../../services/communication/telegram.service';
import { Subscription } from 'rxjs';
import { TelegramHandler } from '../../interfaces/telegramHandler';
import { UserService } from '../../services/api/user/user.service';

@Component({
    selector: 'signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupComponent extends TelegramHandler implements OnInit, AfterViewInit, OnDestroy{

    @ViewChild('signupForm') private signupForm: NgForm;

    private formSubscription: Subscription;
    private telegramSubscription: Subscription;

    constructor(private telegramService: TelegramService, 
                private userService: UserService) { 
        super();
    }


    ngOnInit() {
        this.telegramSubscription = this.telegramService.receiveTelegram().subscribe((telegram: Telegram) => {
            this.handleTelegram(telegram);
		}, err => console.log(err));

    }

    ngAfterViewInit() {
        this.formSubscription = this.signupForm.valueChanges.subscribe(values => {
            let telegram: Telegram = { 
                ModalWrapperComponent: { 
                    payload: {
                        disableSuccessButton : !this.signupForm.valid
                    }
                }
            };
    
            this.telegramService.sendTelegram(telegram);
        })
    }

    public onSubmit() {
        this.setLoading(true);
        this.userService.signUpUser(this.signupForm.value).subscribe(
            () => this.closeModal(), 
            err => this.closeModal());
    }

    
    private setLoading(value: boolean) {
        let telegram: Telegram = { 
            ModalWrapperComponent: { 
                payload: {
                    isLoading: value,
                }
            }
        };
        this.telegramService.sendTelegram(telegram);
    }

    private closeModal() {
        let telegram: Telegram = { 
            ModalWrapperComponent: { 
                payload: {
                    isLoading: false,
                    closeModal: []
                }
            }
        };
        this.telegramService.sendTelegram(telegram);
    }

    ngOnDestroy() {
        this.formSubscription.unsubscribe();
        this.formSubscription = null;
        this.telegramSubscription.unsubscribe();
        this.telegramSubscription = null;
    }

}
