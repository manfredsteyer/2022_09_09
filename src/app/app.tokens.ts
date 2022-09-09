import { InjectionToken } from '@angular/core';
import { FlightService } from './flight-booking/flight.service';

export const BASE_URL = new InjectionToken<string>('BASE_URL');

export const FLIGHT_SERVICES = new InjectionToken<FlightService[]>('FLIGHT_SERVICES');
