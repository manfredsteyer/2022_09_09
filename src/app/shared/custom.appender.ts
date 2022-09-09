import { Injectable } from '@angular/core';
import { AppenderService } from '../logger/appender.service';

@Injectable()
export class CustomAppender implements AppenderService {
  append(message: string): void {
    console.warn(message);
  }
}
