import { Component, OnInit, Input, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { TelegramService } from '../../services/communication/telegram.service';
import { CardApiService } from '../../services/api/card/card.api';
import { InitProfile, OpenModal, SetLoading } from '../../helpers/decorators/controllers.decorator';
import { ModalConfig } from '../../interfaces/modalConfig.interface';
import { SubscriptionApiService } from '../../services/api/subscription/subscription.api';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'cards-list',
    templateUrl: './cards-list.component.html',
    styleUrls: ['./cards-list.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardsListComponent implements OnInit {
    @Input('cards') public cards: any;
    @Input('subscriptionIds') private subscriptionIds: string[];

    @OpenModal() public openModal(modalToOpen: string, modalType? :string) {}
    @InitProfile() private initProfile() {}
    @SetLoading('ProfileComponent') private setLoading(value: boolean) {}

    public selectedCard: any = null;

    constructor(private telegramService: TelegramService,
                private cardService: CardApiService,
                private subscriptionService: SubscriptionApiService) { }

    ngOnInit() {

    }

    private deleteCard(cardId) {
        this.setLoading(true);
        this.cardService.deleteCard(cardId).subscribe(() => {
            this.initProfile();
        }, err => {
            this.setLoading(false);
        });
    }

    private setDefaultCard(cardId) {
        this.setLoading(true);
        this.cardService.setDefaultCard(cardId).subscribe(
            () => this.initProfile(),
            () => this.setLoading(false)
        );
    }

    private delLastCardAndSuspendAllSubs() {
        this.setLoading(true);
        if (this.subscriptionIds.length > 0) {
            forkJoin(
                this.cardService.deleteCard(this.selectedCard.id),
                this.subscriptionService.suspendSubscription(this.subscriptionIds)
            ).subscribe(
                () => this.initProfile(),
                () => this.setLoading(false)
            );

        } else {
            this.deleteCard(this.selectedCard.id);
        }
    }

    private getModalConfig(): ModalConfig {
        return {
            ConfirmationComponent: getConfirmationConfig
        };

        function getConfirmationConfig () {
            const card = `${this.selectedCard.brand} ${this.selectedCard.country} ****${this.selectedCard.last4}`;
            return {
                deleteCard: {
                    payload : {
                        modalHeader: 'Delete the card',
                        successButton: 'Delete',
                        modalData : {
                            message : `Delete the card ${card}?`,
                            callback: this.deleteCard.bind(this, this.selectedCard.id)
                        }
                    }
                },
                deleteLastCard: {
                    payload: {
                        modalHeader: 'Delete the last card',
                        successButton: 'Delete and unsubsribe',
                        modalData : {
                            message : `This is your last payment source. Deleting will provoke suspending of all your
                                    active subscriptions. Would you like to delete the card ${card} anyway?`,
                            callback: this.delLastCardAndSuspendAllSubs.bind(this)
                        }
                    }
                },
                setDefaultCard: {
                    payload: {
                        modalHeader: 'Set the default card',
                        successButton: 'Set',
                        modalData : {
                            message : `Set the card ${card} as default?`,
                            callback: this.setDefaultCard.bind(this, this.selectedCard.id)
                        }
                    }
                }
            };
        }
    }

    public trackByFn(index) {
        return index;
    }
}

