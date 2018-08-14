import { Component, OnInit, ChangeDetectionStrategy, ViewChild, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Telegram } from '../../interfaces/telegram.interface';
import { TelegramService } from '../../services/communication/telegram.service';
import { Subscription } from 'rxjs';
import { UserApiService } from '../../services/api/user/user.api';
import { skipWhile, map, distinctUntilChanged } from 'rxjs/operators';
import { SetLoading, CloseModal } from '../../helpers/decorators/controllers.decorator';

@Component({
    selector: 'signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('signupForm') private signupForm: NgForm;

    private formSubscription: Subscription;

    @SetLoading('ModalWrapperComponent') private setLoading(value: boolean) { }
    @CloseModal() private closeModal() { }

    constructor(private telegramService: TelegramService,
                private cdr: ChangeDetectorRef,
                private userService: UserApiService) {
    }

    ngOnInit() {
        this.telegramService.subscribe(this, () => {
            this.cdr.markForCheck();
        });
    }

    ngAfterViewInit() {
        this.formSubscription = this.signupForm.valueChanges
            .pipe(
                skipWhile(values => Object.values(values).length < 3),
                map(() => this.signupForm.valid),
                distinctUntilChanged()
            )
            .subscribe((isValid) => {
                const telegram: Telegram = {
                    ModalWrapperComponent: {
                        payload: {
                            disableSuccessButton : !isValid
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

    ngOnDestroy() {
        this.telegramService.unsubscribe(this);
        this.formSubscription.unsubscribe();
        this.formSubscription = null;
    }
}
