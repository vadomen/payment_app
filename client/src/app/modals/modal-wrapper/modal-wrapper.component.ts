import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TelegramService } from '../../services/communication/telegram.service';
import { Telegram } from '../../interfaces/telegram.interface';
import { TelegramHandler } from '../../helpers/decorators/telegramHandler.decorator';


@TelegramHandler()
@Component({
  selector: 'modal-wrapper',
  templateUrl: './modal-wrapper.component.html',
  styleUrls: ['./modal-wrapper.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalWrapperComponent implements OnInit, AfterViewInit, OnDestroy {

	@ViewChild('modal') modal: ElementRef;

	private telegramSubscription: Subscription;

	public modalInstance;
    public activeModal: string | null = null;
    public modalHeader: string = '';
    public successButton: string = 'Create';
    public cancelButton: string = 'Cancel';
    public disableSuccessButton: boolean = false;

    public isLoading: boolean = false;

    constructor(
                private telegramService: TelegramService, 
                private cdr: ChangeDetectorRef
            ) { 
	}

	ngOnInit() { }

	ngAfterViewInit() {
		M.Modal.init(this.modal.nativeElement, { dismissible: false });
		this.modalInstance = M.Modal.getInstance(this.modal.nativeElement);
	}

	private openModal(modalToOpen: string) {
		this.activeModal = modalToOpen;
		this.modalInstance.open();
	}

	public closeModal() {
		this.activeModal = null;
        this.modalInstance.close();
    }
    
    public onSubmit() {
        let telegram: Telegram = { 
            [this.activeModal]: { 
                payload: {
                    onSubmit: []
                }
            }
        };
        this.telegramService.sendTelegram(telegram);
    }

	ngOnDestroy() { }
}
