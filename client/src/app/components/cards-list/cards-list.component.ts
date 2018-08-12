import { Component, OnInit, Input, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { TelegramService } from '../../services/communication/telegram.service';
import { CardApiService } from '../../services/api/card/card.api';
import { InitProfile, OpenModal, SetLoading } from '../../helpers/decorators/controllers.decorator';
import { ModalConfig } from '../../interfaces/modalConfig.interface';

@Component({
    selector: 'cards-list',
    templateUrl: './cards-list.component.html',
    styleUrls: ['./cards-list.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardsListComponent implements OnInit {
    @Input('cards') public cards: any;

    @OpenModal() public openModal(modalToOpen: string, modalType? :string) {}
    @InitProfile() private initProfile() {}
    @SetLoading('ProfileComponent') private setLoading(value: boolean) {}

    public cardsList: any[] = [];
    public selectedCard: any = null;

    constructor(private telegramService: TelegramService,
                private paymentService: CardApiService) { }

    ngOnInit() {

    }

    private deleteCard(cardId) {
        this.setLoading(true);
        this.paymentService.deleteCard(cardId).subscribe(() => {
            this.initProfile();
        }, err => {
            this.setLoading(false);
        });
    }

    private setDefaultCard(cardId) {
        console.log(cardId);
    }

    public trackByFn(index) {
        return index;
    }
    
    private getModalConfig(): ModalConfig {
        return {
            ConfirmationComponent: getConfirmationConfig
        }

        function getConfirmationConfig () {
            const card = `${this.selectedCard.brand} ${this.selectedCard.country} ****${this.selectedCard.last4}`;
            return {
                deleteCard: {
                    payload : {
                        modalData : {
                            message : `Delete the card ${card}?`,
                            callback: this.deleteCard.bind(this, this.selectedCard.id)
                        }
                    }
                },
                setDefaultCard: {
                    payload: {
                        modalData : {
                            message : `Set the card ${card} as default?`,
                            callback: this.setDefaultCard.bind(this, this.selectedCard.id)
                        }
                    }
                }    
            }
        };
    }
}

