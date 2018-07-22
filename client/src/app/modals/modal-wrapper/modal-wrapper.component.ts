import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { TelegramHandler } from '../../interfaces/telegramHandler';
import { Subscription } from 'rxjs';
import { TelegramService } from '../../services/communication/telegram.service';
import { Telegram } from '../../interfaces/telegram';

@Component({
  selector: 'modal-wrapper',
  templateUrl: './modal-wrapper.component.html',
  styleUrls: ['./modal-wrapper.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalWrapperComponent extends TelegramHandler implements OnInit {

	@ViewChild('modal') modal: ElementRef;

	private telegramSubscription: Subscription;

	public modalInstance;
    public activeModal: string | null = null;
    public modalHeader: string = '';
    public successButton: string = 'Create';
    public cancelButton: string = 'Cancel';

	constructor(private telegramService: TelegramService, private cdr: ChangeDetectorRef) { 
		super();
	}

	ngOnInit() {
		this.telegramSubscription = this.telegramService.receiveTelegram().subscribe((telegram: Telegram) => {
            this.handleTelegram(telegram);
            this.cdr.detectChanges();
		});
	}

	ngAfterViewInit() {
		M.Modal.init(this.modal.nativeElement, { dismissible: false });
		this.modalInstance = M.Modal.getInstance(this.modal.nativeElement);
	}

	private openModal(modalToOpen: string) {
		this.activeModal = modalToOpen;
		this.modalInstance.open();
	}

	private closeModal() {
		this.activeModal = null;
        this.modalInstance.close();
	}

	ngOnDestroy() {
		this.telegramSubscription.unsubscribe();
		this.telegramSubscription = null;
	}
}
