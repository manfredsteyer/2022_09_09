/* eslint-disable @typescript-eslint/member-ordering */
// src/app/flight-search/flight-search.component.ts

import { Component, inject } from '@angular/core';
import { FLIGHT_SERVICES } from 'src/app/app.tokens';
import { Flight } from '../flight';
import { DummyFlightService, FlightService } from '../flight.service';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.scss']
  // providers: [
  //   {
  //     provide: FlightService,
  //     useClass: DummyFlightService
  //   }
  // ]
})
export class FlightSearchComponent {
  private flightService = inject(FlightService);

  private flightServices = inject(FLIGHT_SERVICES);

  from = 'Hamburg';
  to = 'Graz';
  selectedFlight: Flight | null = null;
  delayFilter = false;

  flights$ = this.flightService.flights$;

  basket: { [key: number]: boolean } = {
    3: true,
    5: true
  };

  constructor() {
    console.log('flightServices', this.flightServices);
  }

  // get flights() {
  //   // We will refactor this to an observable in a later exercise!
  //   return this.flightService.flights;
  // }

  search(): void {
    this.flightService.load(this.from, this.to);

    //this.flightServices.forEach((s) => s.load(this.from, this.to));
  }

  select(f: Flight): void {
    this.selectedFlight = f;
  }

  delay(): void {
    this.flightService.delay();
  }
}
