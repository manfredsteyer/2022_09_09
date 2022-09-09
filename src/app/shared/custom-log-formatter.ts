import { Injectable } from '@angular/core';
import { FormatterService } from '../logger/formatter.service';

@Injectable()
export class CustomLogFormatterService implements FormatterService {
  format(logLevel: string, message: string): string {
    return `[${new Date().toISOString()}] ${logLevel}: ${message}`;
  }
}
