import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { FlightEditComponent } from 'src/app/flight-booking/flight-edit/flight-edit.component';

export interface ComponentWithExitCheck {
  canExit(): Observable<boolean>;
}

@Injectable({ providedIn: 'root' })
export class ExitGuard implements CanDeactivate<ComponentWithExitCheck> {
  //   constructor() {}
  canDeactivate(cmp: ComponentWithExitCheck) {
    return cmp.canExit();
  }
}
