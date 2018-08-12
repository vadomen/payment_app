import { Component, OnInit, Input, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { Telegram } from '../../interfaces/telegram.interface';
import { TelegramService } from '../../services/communication/telegram.service';
import { CardApiService } from '../../services/api/card/card.api';
import { InitProfile, OpenModal } from '../../helpers/decorators/controllers.decorator';

@Component({
    selector: 'cards-list',
    templateUrl: './cards-list.component.html',
    styleUrls: ['./cards-list.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardsListComponent implements OnInit {
    @Input('cards') public cards: any;

    public cardsList: any[] = [];
    public cardToDelete: string | null = null;

    constructor(private telegramService: TelegramService,
                private paymentService: CardApiService) { }

    ngOnInit() {

    }

    @OpenModal()
    public openModal(modalToOpen: string) {}

    @InitProfile()
    private initProfile() { }

    public deleteCard(cardId) {
        this.setLoading(true);
        this.paymentService.deleteCard(cardId).subscribe(() => {
            this.initProfile();
        }, err => {
            this.setLoading(false);
        });
    }

    public trackByFn(index) {
        return index;
    }

    private setLoading(value: boolean) {
        const telegram: Telegram = {
            ProfileComponent: {
                payload: {
                    isLoading: value
                }
            }
        };
        this.telegramService.sendTelegram(telegram);
    }
    
    private getModalConfig() {
        return {
            ConfirmationComponent: {
                payload : {
                    modalData : {
                        message : `Are you sure your want to delete the card ${this.cardToDelete}?`,
                        callback: this.deleteCard.bind(this, this.cardToDelete)
                    }
                }
            }
        }
    }
}
