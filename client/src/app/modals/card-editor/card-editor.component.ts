import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit, ViewChild,
        ElementRef, ChangeDetectorRef, OnDestroy, Input } from '@angular/core';
import { CardApiService } from '../../services/api/card/card.api';
import { TelegramService } from '../../services/communication/telegram.service';
import { Telegram } from '../../interfaces/telegram.interface';
import { Subscription } from 'rxjs';
import { TelegramHandler } from '../../helpers/decorators/telegramHandler.decorator';
import { CloseModal, InitProfile } from '../../helpers/decorators/controllers.decorator';

@TelegramHandler()
@Component({
  selector: 'card-editor',
  templateUrl: './card-editor.component.html',
  styleUrls: ['./card-editor.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardEditorComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('cardContainer') private cardContainer: ElementRef;
    @Input('data') private data: any;

    private telegramSubscription: Subscription;

    private elements: any;
    private card: any;
    private cardHandler = this.onChange.bind(this);
    public errorMessage: string | null = null;

    constructor(private paymentService: CardApiService,
                private cdr: ChangeDetectorRef,
                private telegramService: TelegramService) {
        this.elements = this.paymentService.initStripeElements();
    }

    ngOnInit() {}

    ngAfterViewInit() {
        console.log(this.data);
        this.card = this.elements.create('card');
        this.card.addEventListener('change', this.cardHandler);
        this.card.mount(this.cardContainer.nativeElement);
    }

    onChange({ error, complete }) {
        if (error) {
            this.errorMessage = error.message;
        } else {
            this.errorMessage = null;
        }
        this.cdr.markForCheck();

        const telegram: Telegram = {
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
        this.paymentService.addCard(this.card).subscribe(
            () => {
                this.initProfile();
                this.closeModal();
            }, err => {
                this.closeModal();
            });
    }

    private setLoading(value: boolean) {
        const telegram: Telegram = {
            ModalWrapperComponent: {
                payload: {
                    isLoading: value,
                }
            }
        };
        this.telegramService.sendTelegram(telegram);
    }

    @InitProfile()
    private initProfile() { }

    @CloseModal()
    private closeModal() { }

    ngOnDestroy() {
        this.card.removeEventListener('change', this.cardHandler);
        this.card.destroy();
    }
}
