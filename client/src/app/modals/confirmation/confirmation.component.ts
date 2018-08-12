import { Component, OnInit, ChangeDetectionStrategy, Input, 
        ChangeDetectorRef, OnDestroy } from '@angular/core';
import { TelegramHandler } from '../../helpers/decorators/telegramHandler.decorator';
import { TelegramService } from '../../services/communication/telegram.service';
import { CloseModal } from '../../helpers/decorators/controllers.decorator';

@TelegramHandler()
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

    ngOnInit() { }

    private onSubmit() {
        this.closeModal();
        this.data.callback();
    }

    ngOnDestroy() {

    }

}
