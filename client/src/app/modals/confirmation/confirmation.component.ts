import { Component, OnInit, ChangeDetectionStrategy, Input,
        ChangeDetectorRef, OnDestroy } from '@angular/core';
import { TelegramService } from '../../services/communication/telegram.service';
import { CloseModal } from '../../helpers/decorators/controllers.decorator';

@Component({
    selector: 'confirmation',
    templateUrl: './confirmation.component.html',
    styleUrls: ['./confirmation.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class ConfirmationComponent implements OnInit, OnDestroy {
    @Input('data') public data: any;

    @CloseModal() private closeModal() { }

    constructor(
        private telegramService: TelegramService,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit() {
        this.telegramService.subscribe(this, () => {
            this.cdr.markForCheck();
        });
    }

    private onSubmit() {
        this.closeModal();
        this.data.callback();
    }

    ngOnDestroy() {
        this.telegramService.unsubscribe(this);
    }
}
