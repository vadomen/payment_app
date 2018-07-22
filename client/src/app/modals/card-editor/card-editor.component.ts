import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { PaymentService } from '../../services/payment/payment.service';
import { TelegramService } from '../../services/communication/telegram.service';
import { Telegram } from '../../interfaces/telegram';
import { Subscription } from 'rxjs';
import { TelegramHandler } from '../../interfaces/telegramHandler';

@Component({
  selector: 'card-editor',
  templateUrl: './card-editor.component.html',
  styleUrls: ['./card-editor.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardEditorComponent extends TelegramHandler implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('cardContainer') private cardContainer: ElementRef;

    private telegramSubscription: Subscription;
    public elements: any;
    public card: any;
    private cardHandler = this.onChange.bind(this);
    public errorMessage: string | null = null;

    constructor(private paymentService: PaymentService, 
                private cdr: ChangeDetectorRef, 
                private telegramService: TelegramService) {
        super();
        this.elements = this.paymentService.initStripeElements();
    }

    ngOnInit() {
		this.telegramSubscription = this.telegramService.receiveTelegram().subscribe((telegram: Telegram) => {
            this.handleTelegram(telegram);
		}, err => console.log(err));
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
        console.log('hello');
        // this.paymentService.createPaymentToken(this.card);
    }

    ngOnDestroy() {
        this.telegramSubscription.unsubscribe();
		this.telegramSubscription = null;
    }

}
