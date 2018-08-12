import { Component, OnInit, Input, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { Telegram } from '../../interfaces/telegram.interface';
import { TelegramService } from '../../services/communication/telegram.service';
import { CardApiService } from '../../services/api/card/card.api';
import { InitProfile, OpenModal, SetLoading } from '../../helpers/decorators/controllers.decorator';

@Component({
    selector: 'cards-list',
    templateUrl: './cards-list.component.html',
    styleUrls: ['./cards-list.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardsListComponent implements OnInit {
    @Input('cards') public cards: any;

    @OpenModal() public openModal(modalToOpen: string) {}
    @InitProfile() private initProfile() {}
    @SetLoading('ProfileComponent') private setLoading(value: boolean) {}

    public cardsList: any[] = [];
    public cardToDelete: string | null = null;

    constructor(private telegramService: TelegramService,
                private paymentService: CardApiService) { }

    ngOnInit() {

    }

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
    
    private getModalConfig(): Telegram {
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
