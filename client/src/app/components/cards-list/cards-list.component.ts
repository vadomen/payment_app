import { Component, OnInit, Input, AfterContentInit, DoCheck, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { Telegram } from '../../interfaces/telegram.interface';
import { TelegramService } from '../../services/communication/telegram.service';
import { PaymentService } from '../../services/api/payment/payment.service';

@Component({
    selector: 'cards-list',
    templateUrl: './cards-list.component.html',
    styleUrls: ['./cards-list.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardsListComponent implements OnInit {
    @Input('cards') public cards: any;

    private defaultCard: string | null = null;
    public cardsList: any[] = [];

    constructor(private telegramService: TelegramService,
                private paymentService: PaymentService) { }

    ngOnInit() {

    }

    public openModal(modalToOpen: string) {
        let telegram: Telegram = { 
            ModalWrapperComponent: { 
                payload: {
                    modalHeader: 'Add a new card',
                    successButton: 'Create a card',
                    disableSuccessButton : true,
                    modalData: { testProperty : 'TEST PROPERTY'},
                    openModal: modalToOpen,
                }
            }
        };
        this.telegramService.sendTelegram(telegram);
    }

    public deleteCard(cardId) {
        this.setLoading(true);
        this.paymentService.deleteCard(cardId).subscribe(() => {
            this.initProfile();
        }, err => {
            this.setLoading(false);
            console.log(err);
        });
    }

	public trackByFn(index, item) {
        return index;
    }
    
    private setLoading(value: boolean) {
        let telegram: Telegram = { 
            ProfileComponent: { 
                payload: {
                    isLoading: value
                }
            }
        };
        this.telegramService.sendTelegram(telegram);
    }

    private initProfile() {
        let telegram: Telegram = { 
            ProfileComponent: {
                payload: {
                    initProfile: []
                }
            }
        };

        this.telegramService.sendTelegram(telegram);
    }
}
