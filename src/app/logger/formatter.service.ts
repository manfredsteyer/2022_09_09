import { Injectable } from '@angular/core';

export abstract class FormatterService {
  abstract format(logLevel: string, message: string): string;
}

@Injectable()
export class DefaultFormatterService implements FormatterService {
  format(logLevel: string, message: string): string {
    return `${logLevel.toUpperCase()}: ${message}`;
  }
}
