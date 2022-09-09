import { inject, Injectable } from '@angular/core';
import { LOG_APPENDERS } from './appender.service';
import { ConfigService } from './config.service';
import { FormatterService } from './formatter.service';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  appender = inject(LOG_APPENDERS);

  constructor(private formatter: FormatterService, private config: ConfigService) {}

  debug(msg: string): void {
    if (!this.config.debug) {
      return;
    }
    const fmt = this.formatter.format('debug', msg);
    this.writeToAppenders(fmt);
  }

  log(msg: string): void {
    const fmt = this.formatter.format('log', msg);
    this.writeToAppenders(fmt);
  }

  writeToAppenders(msg: string): void {
    this.appender.forEach((a) => a.append(msg));
  }
}
