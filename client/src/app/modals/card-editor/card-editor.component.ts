import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { PaymentService } from '../../services/api/payment/payment.service';
import { TelegramService } from '../../services/communication/telegram.service';
import { Telegram } from '../../interfaces/telegram';
import { Subscription } from 'rxjs';
import { TelegramHandler } from '../../helpers/decorators/telegramHandler';

@TelegramHandler()
@Component({
  selector: 'card-editor',
  templateUrl: './card-editor.component.html',
  styleUrls: ['./card-editor.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardEditorComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('cardContainer') private cardContainer: ElementRef;

    private telegramSubscription: Subscription;
    private elements: any;
    private card: any;
    private cardHandler = this.onChange.bind(this);
    public errorMessage: string | null = null;

    constructor(private paymentService: PaymentService, 
                private cdr: ChangeDetectorRef, 
                private telegramService: TelegramService) {
        this.elements = this.paymentService.initStripeElements();
    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        this.card = this.elements.create('card');
        this.card.addEventListener('change', this.cardHandler);
        this.card.mount(this.cardContainer.nativeElement);
    }

    onChange({ error, complete }) {
        if (error) {
            this.errorMessage= error.message;
        } else {
            this.errorMessage = null;
        }
        this.cdr.detectChanges();

        let telegram: Telegram = { 
            ModalWrapperComponent: { 
                payload: {
                    disableSuccessButton : !complete
                }
            }
        };

        this.telegramService.sendTelegram(telegram);
      }

    private onSubmit() {
        this.setLoading(true);
        this.paymentService.addCard(this.card).then(obs=> {
            obs.subscribe(res => {
                this.initProfile();
                this.closeModal();
            }, err => {
                console.log(err);
                this.closeModal();
            });
        });
    }

    private setLoading(value: boolean) {
        let telegram: Telegram = { 
            ModalWrapperComponent: { 
                payload: {
                    isLoading: value,
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

    private closeModal() {
        let telegram: Telegram = { 
            ModalWrapperComponent: { 
                payload: {
                    isLoading: false,
                    closeModal: []
                }
            }
        };
        this.telegramService.sendTelegram(telegram);
    }

    ngOnDestroy() {
        this.card.removeEventListener('change', this.cardHandler);
        this.card.destroy();
    }

}
