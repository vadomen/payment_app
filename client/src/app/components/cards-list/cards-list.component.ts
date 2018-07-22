import { Component, OnInit, Input, AfterContentInit, DoCheck, ChangeDetectionStrategy } from '@angular/core';
import { Telegram } from '../../interfaces/telegram';
import { TelegramService } from '../../services/communication/telegram.service';

@Component({
    selector: 'cards-list',
    templateUrl: './cards-list.component.html',
    styleUrls: ['./cards-list.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardsListComponent implements OnInit {
    @Input('cards') public cards: any;
    
    constructor(private telegramService: TelegramService) { }

    ngOnInit() {

    }

    public openModal(modalToOpen: string) {
        let telegram: Telegram = { 
            ModalWrapperComponent: { 
                payload: {
                    openModal: modalToOpen,
                    modalHeader: 'Add a new card',
                    successButton: 'Create a card',
                    disableSuccessButton : true
                }
            }
        };
        this.telegramService.sendTelegram(telegram);
    }
}
