import { Component, OnInit } from '@angular/core';
import { LoggingService } from '../../services/logging.service';

@Component({
  selector: 'logger',
  templateUrl: './logger.component.html',
  styleUrls: ['./logger.component.less']
})
export class LoggerComponent implements OnInit {

  constructor(private loggingService: LoggingService) { }

  ngOnInit() {
      this.loggingService.receiveMessage().subscribe(log => {
            console.log(log);
      });
  }

}
