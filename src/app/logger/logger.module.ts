/* eslint-disable arrow-body-style */
import { ModuleWithProviders, NgModule, Provider, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultFormatterService, FormatterService } from './formatter.service';
import { ConfigService } from './config.service';
import { AppenderService, DefaultAppender, LOG_APPENDERS } from './appender.service';

export interface LoggerOptions {
  config?: ConfigService;
  formatter?: Type<FormatterService>;
}

@NgModule({
  declarations: [],
  providers: [],
  imports: [CommonModule]
})
export class LoggerModule {
  static forRoot(options: LoggerOptions): ModuleWithProviders<LoggerModule> {
    return {
      ngModule: LoggerModule,
      providers: [
        {
          provide: ConfigService,
          useValue: options.config ?? { debug: false }
        },
        {
          provide: FormatterService,
          useClass: options.formatter ?? DefaultFormatterService
        },
        {
          provide: LOG_APPENDERS,
          useClass: DefaultAppender,
          multi: true
        }
      ]
    };
  }
}

export const provideLogger = (options: LoggerOptions): Provider[] => {
  return [
    {
      provide: ConfigService,
      useValue: options.config ?? { debug: false }
    },
    {
      provide: FormatterService,
      useClass: options.formatter ?? DefaultFormatterService
    }
  ];
};
