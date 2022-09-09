// src/app/default-flight.service.ts

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { BASE_URL } from '../app.tokens';
import { Flight } from './flight';
import { FlightBookingApiModule } from './flight-booking-api.module';
import { FlightBookingModule } from './flight-booking.module';

@Injectable()
export class DefaultFlightService implements FlightService {
  // We will refactor this to an observable in a later exercise!
  flights: Flight[] = [];

  private flightsSubject = new BehaviorSubject<Flight[]>([]);
  // eslint-disable-next-line @typescript-eslint/member-ordering
  readonly flights$: Observable<Flight[]> = this.flightsSubject.asObservable();

  // private baseUrl2 = inject(BASE_URL);

  constructor(@Inject(BASE_URL) private baseUrl: string, private http: HttpClient) {
    /*x*/
  }
  findById(id: number): Observable<Flight | null> {
    const url = `${this.baseUrl}/flight`;

    const headers = new HttpHeaders().set('Accept', 'application/json');

    const params = new HttpParams().set('id', id);

    return this.http.get<Flight>(url, { headers, params });
  }

  load(from: string, to: string): void {
    this.find(from, to).subscribe({
      next: (flights) => {
        this.flights = flights;

        this.flightsSubject.next(flights);
      },
      error: (err) => {
        console.error('error', err);
      }
    });
  }

  find(from: string, to: string): Observable<Flight[]> {
    const url = `${this.baseUrl}/flight`;

    const headers = new HttpHeaders().set('Accept', 'application/json');

    const params = new HttpParams().set('from', from).set('to', to);

    return this.http.get<Flight[]>(url, { headers, params });
  }

  delay(): void {
    const date = new Date(this.flights[0].date);

    const newDate = new Date(date.getTime() + 1000 * 60 * 15);
    const newFlight: Flight = { ...this.flights[0], date: newDate.toISOString() };
    const newFlights: Flight[] = [newFlight, ...this.flights.slice(1)];

    this.flights = newFlights;

    this.flightsSubject.next(newFlights);
  }
}

@Injectable()
export class DummyFlightService implements FlightService {
  flights: Flight[] = [];

  private flightsSubject = new BehaviorSubject<Flight[]>([]);
  // eslint-disable-next-line @typescript-eslint/member-ordering
  flights$: Observable<Flight[]> = this.flightsSubject.asObservable();

  load(from: string, to: string): void {
    this.flights = [
      { id: 1, from: 'A', to: 'B', date: new Date().toISOString() },
      { id: 2, from: 'C', to: 'D', date: new Date().toISOString() },
      { id: 3, from: 'E', to: 'F', date: new Date().toISOString() }
    ];
    this.flightsSubject.next(this.flights);
  }
  find(from: string, to: string): Observable<Flight[]> {
    return of([]);
  }
  findById(id: number): Observable<Flight | null> {
    return of(null);
  }
  delay(): void {}
}

const DEBUG = false;

@Injectable({
  providedIn: FlightBookingApiModule,
  // useClass: DefaultFlightService
  useFactory: () => {
    if (DEBUG) {
      return new DummyFlightService();
    } else {
      return new DefaultFlightService(inject(BASE_URL), inject(HttpClient));
    }
  }
  // deps: []
})
export abstract class FlightService {
  abstract flights: Flight[];
  abstract readonly flights$: Observable<Flight[]>;
  abstract load(from: string, to: string): void;
  abstract find(from: string, to: string): Observable<Flight[]>;
  abstract findById(id: number): Observable<Flight | null>;

  abstract delay(): void;
}
