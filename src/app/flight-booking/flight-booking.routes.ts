// src/app/flight-booking/flight-booking.routes.ts

import { ActivatedRouteSnapshot, Router, Routes } from '@angular/router';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { PassengerSearchComponent } from './passenger-search/passenger-search.component';

// Diesen Import hinzufügen
import { FlightEditComponent } from './flight-edit/flight-edit.component';
import { FlightBookingComponent } from './flight-booking.component';
import { AuthGuard } from '../shared/auth/auth.guard';
import { inject } from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';
import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { ComponentWithExitCheck, ExitGuard } from '../shared/exit/exit.guard';
import { FlightResolver } from './flight-edit/flight.resolver';
import { FlightService } from './flight.service';
import { Params } from '@angular/router';

const canActivate = () => false;

export const FLIGHT_BOOKING_ROUTES: Routes = [
  {
    path: '',
    component: FlightBookingComponent,
    // canActivateChild: [(child: ActivatedRouteSnapshot) => child.component !== PassengerSearchComponent],
    children: [
      {
        path: '',
        redirectTo: 'flight-search',
        pathMatch: 'full'
      },
      {
        path: 'flight-search',
        component: FlightSearchComponent
      },
      {
        path: 'passenger-search',
        component: PassengerSearchComponent,
        canActivate: [
          // eslint-disable-next-line arrow-body-style
          // () => {
          //   const router = inject(Router);
          //   return of(null).pipe(
          //     delay(1000),
          //     map(() => router.createUrlTree(['/']))
          //   );
          // },
          // () => false,
          () => inject(AuthService).isAuthenticated()
        ]
      },
      {
        path: 'flight-edit/:id',
        component: FlightEditComponent,
        resolve: {
          flight: (r: ActivatedRouteSnapshot) => inject(FlightService).findById(r.params.id)
        },
        canDeactivate: [(comp: FlightEditComponent) => comp.canExit()]
      }
    ]
  }
];
