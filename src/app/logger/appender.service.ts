import { Injectable, InjectionToken } from '@angular/core';

export const LOG_APPENDERS = new InjectionToken<AppenderService[]>('LOG_APPENDERS');

export abstract class AppenderService {
  abstract append(message: string): void;
}

@Injectable()
export class DefaultAppender implements AppenderService {
  append(message: string): void {
    console.log(message);
  }
}
