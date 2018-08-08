import { Component, OnInit, ChangeDetectionStrategy, ViewChild, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Telegram } from '../../interfaces/telegram.interface';
import { TelegramService } from '../../services/communication/telegram.service';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/api/user/user.service';
import { skipWhile } from 'rxjs/operators';
import { TelegramHandler } from '../../helpers/decorators/telegramHandler.decorator';

@TelegramHandler()
@Component({
    selector: 'signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('signupForm') private signupForm: NgForm;

    private formSubscription: Subscription;
    private telegramSubscription: Subscription;

    constructor(private telegramService: TelegramService,
                private cdr: ChangeDetectorRef,
                private userService: UserService) { 
    }

    ngOnInit() { }

    ngAfterViewInit() {
        this.formSubscription = this.signupForm.valueChanges
            .pipe(skipWhile(values => Object.values(values).length < 3))
            .subscribe(values => {
                let telegram: Telegram = { 
                    ModalWrapperComponent: { 
                        payload: {
                            disableSuccessButton : !this.signupForm.valid
                        }
                    }
                };
    
                this.telegramService.sendTelegram(telegram);
        });
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
    }

}
