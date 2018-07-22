import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { PaymentService } from '../../services/payment/payment.service';
import { TelegramService } from '../../services/communication/telegram.service';
import { Telegram } from '../../interfaces/telegram';

@Component({
  selector: 'card-editor',
  templateUrl: './card-editor.component.html',
  styleUrls: ['./card-editor.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardEditorComponent implements OnInit, AfterViewInit {
    @ViewChild('cardContainer') private cardContainer: ElementRef;

    public elements: any;
    public card: any;
    private cardHandler = this.onChange.bind(this);
    public errorMessage: string | null = null;

    constructor(private paymentService: PaymentService, 
                private cdr: ChangeDetectorRef, 
                private telegramSerice: TelegramService) { 
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
        
        this.telegramSerice.sendTelegram(telegram);
      }

}
