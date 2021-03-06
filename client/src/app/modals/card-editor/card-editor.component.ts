import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit, ViewChild,
        ElementRef, ChangeDetectorRef, OnDestroy, Input } from '@angular/core';
import { CardApiService } from '../../services/api/card/card.api';
import { TelegramService } from '../../services/communication/telegram.service';
import { Telegram } from '../../interfaces/telegram.interface';
import { CloseModal, InitProfile, SetLoading } from '../../helpers/decorators/controllers.decorator';

@Component({
  selector: 'card-editor',
  templateUrl: './card-editor.component.html',
  styleUrls: ['./card-editor.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardEditorComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('cardContainer') private cardContainer: ElementRef;
    @Input('data') private data: any;

    private elements: any;
    private card: any;
    private cardHandler = this.onChange.bind(this);
    public errorMessage: string | null = null;

    @SetLoading('ModalWrapperComponent') private setLoading(value: boolean) { }
    @InitProfile() private initProfile() { }
    @CloseModal() private closeModal() { }

    constructor(private cardService: CardApiService,
                private cdr: ChangeDetectorRef,
                private telegramService: TelegramService) {
        this.elements = this.cardService.initStripeElements();
    }

    ngOnInit() {
        this.telegramService.subscribe(this, () => {
            this.cdr.markForCheck();
        });
    }

    ngAfterViewInit() {
        this.card = this.elements.create('card');
        this.card.addEventListener('change', this.cardHandler);
        this.card.mount(this.cardContainer.nativeElement);
    }

    private onChange({ error, complete }) {
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
        this.cardService.addCard(this.card).subscribe(
            () => {
                this.initProfile();
                this.closeModal();
            }, err => {
                this.closeModal();
            });
    }

    ngOnDestroy() {
        this.telegramService.unsubscribe(this);
        this.card.removeEventListener('change', this.cardHandler);
        this.card.destroy();
    }
}
