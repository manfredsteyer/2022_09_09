// src/app/app.module.ts

import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BrowserModule } from '@angular/platform-browser';
import { inject, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FlightBookingModule } from './flight-booking/flight-booking.module';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from './app.routes';
import { SharedModule } from './shared/shared.module';
import { BasketComponent } from './basket/basket.component';
import { DefaultFlightService, DummyFlightService, FlightService } from './flight-booking/flight.service';
import { BASE_URL, FLIGHT_SERVICES } from './app.tokens';
import { LoggerModule, provideLogger } from './logger/logger.module';
import { ConfigService } from './logger/config.service';
import { FormatterService } from './logger/formatter.service';
import { CustomLogFormatterService } from './shared/custom-log-formatter';
import { LOG_APPENDERS } from './logger/appender.service';
import { CustomAppender } from './shared/custom.appender';

const DEBUG = false;

@NgModule({
  imports: [
    LoggerModule.forRoot({
      config: {
        debug: true
      },
      formatter: CustomLogFormatterService
    }),
    RouterModule.forRoot(APP_ROUTES),
    HttpClientModule,
    BrowserModule,
    // FlightBookingModule,
    SharedModule.forRoot()
  ],
  declarations: [AppComponent, SidebarComponent, NavbarComponent, HomeComponent, AboutComponent, NotFoundComponent, BasketComponent],
  providers: [
    {
      provide: LOG_APPENDERS,
      useClass: CustomAppender,
      multi: true
    },
    // provideLogger({
    //   config: {
    //     debug: true
    //   },
    //   formatter: CustomLogFormatterService
    // }),
    {
      provide: BASE_URL,
      useValue: 'http://www.angular.at/api'
    },
    {
      provide: FLIGHT_SERVICES,
      useClass: DefaultFlightService,
      multi: true
    },
    {
      provide: FLIGHT_SERVICES,
      useClass: DummyFlightService,
      multi: true
    }

    // {
    //   provide: ConfigService,
    //   useValue: {
    //     debug: true
    //   }
    // },
    // {
    //   provide: FormatterService,
    //   useClass: CustomLogFormatterService
    // }

    // {
    //   provide: FlightService,
    //   useClass: DummyFlightService
    // useFactory: (http: HttpClient) => {
    //   if (DEBUG) {
    //     return new DummyFlightService();
    //   } else {
    //     return new DefaultFlightService(inject(HttpClient));
    //   }
    // }
    // deps: [HttpClient]
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
