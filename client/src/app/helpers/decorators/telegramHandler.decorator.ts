import { Telegram } from '../../interfaces/telegram.interface';
import { filter } from 'rxjs/operators';

function filterReceiver ({ [this.constructor.name] : component }) {
    return component;
}

export function TelegramHandler(): ClassDecorator {
    return function({ prototype }, { ngOnDestroy, ngOnInit } = prototype) {
        prototype.ngOnInit = function(...args) {
            ngOnInit.apply(this, args);
            this.telegramSubscription = this.telegramService
                .receiveTelegram()
                .pipe(filter(filterReceiver.bind(this)))
                .subscribe((telegram: Telegram) => {
                    this.telegramService.handleTelegram(this, telegram);
                    this.cdr.markForCheck();
                }, err => console.log(err));
        };

        prototype.ngOnDestroy = function(...args) {
            ngOnDestroy.apply(this, args);
            this.telegramSubscription.unsubscribe();
        };
    };
}
