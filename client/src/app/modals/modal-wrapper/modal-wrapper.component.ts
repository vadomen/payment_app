import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef,
        ChangeDetectionStrategy, OnDestroy, AfterViewInit } from '@angular/core';
import { TelegramService } from '../../services/communication/telegram.service';
import { Telegram } from '../../interfaces/telegram.interface';


@Component({
  selector: 'modal-wrapper',
  templateUrl: './modal-wrapper.component.html',
  styleUrls: ['./modal-wrapper.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalWrapperComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('modal') modal: ElementRef;

    public modalInstance;
    public activeModal: string | null = null;
    public modalHeader: string = '';
    public successButton: string = 'Create';
    public cancelButton: string = 'Cancel';
    public disableSuccessButton: boolean = false;
    public modalData: any = null;

    public isLoading: boolean = false;

    constructor (
                private telegramService: TelegramService,
                private cdr: ChangeDetectorRef
            ) {}

    ngOnInit() {
        this.telegramService.subscribe(this, () => {
            this.cdr.markForCheck();
        });
    }

    ngAfterViewInit() {
        M.Modal.init(this.modal.nativeElement, { dismissible: false });
        this.modalInstance = M.Modal.getInstance(this.modal.nativeElement);
    }

    private openModal(modalToOpen: string, modalType?: string) {
        this.activeModal = modalToOpen;
        this.modalInstance.open();
    }

    public closeModal() {
        this.isLoading = false;
        this.activeModal = null;
        this.modalInstance.close();
    }

    public onSubmit() {
        const telegram: Telegram = {
            [this.activeModal]: {
                payload: {
                    onSubmit: []
                }
            }
        };
        this.telegramService.sendTelegram(telegram);
    }

    ngOnDestroy() {
        this.telegramService.unsubscribe(this);
    }
}
