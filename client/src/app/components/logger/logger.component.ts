import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { LoggingService } from '../../services/logging/logging.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'logger',
    templateUrl: './logger.component.html',
    styleUrls: ['./logger.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoggerComponent implements OnInit, OnDestroy{

    private loggingSubscription: Subscription;
    public logs: {}[] = [];

    constructor(private loggingService: LoggingService, private cdr: ChangeDetectorRef) { }

    ngOnInit() {
        this.loggingService.receiveMessage().subscribe(log => {
                this.logs.push(log);
                this.cdr.detectChanges();
        });
    }

    ngOnDestroy() {
		this.loggingSubscription.unsubscribe();
		this.loggingSubscription = null;
	}

}
