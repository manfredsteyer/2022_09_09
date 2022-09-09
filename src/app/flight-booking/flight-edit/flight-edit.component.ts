// src/app/flight-booking/flight-edit/flight-edit.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { ComponentWithExitCheck } from 'src/app/shared/exit/exit.guard';
import { Flight } from '../flight';

@Component({
  selector: 'app-flight-edit',
  templateUrl: './flight-edit.component.html',
  styleUrls: ['./flight-edit.component.scss']
})
export class FlightEditComponent implements OnInit, ComponentWithExitCheck {
  id = 0;
  showDetails = false;
  observer!: Observer<boolean>;
  showWarning = false;
  flight: Flight | null = null;

  flightForm = this.fb.group({
    id: new FormControl<number>(0),
    from: ['Graz', [Validators.required, Validators.minLength(3)]],
    to: ['Hamburg'],
    date: [],
    delayed: [false],
    details: this.fb.group({
      direct: [false],
      seatsCount: [30 * 6]
    })
  });

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {
    this.flightForm.valueChanges.subscribe((form) => {
      console.log('form changed', form);

      this.flight = form as any;
    });

    this.flightForm.controls.from.valueChanges.subscribe((from) => {
      console.log('from changed', from);
    });
  }

  decide(decision: boolean): void {
    this.showWarning = false;
    this.observer.next(decision);
    this.observer.complete();
  }

  canExit(): Observable<boolean> {
    this.showWarning = true;
    return new Observable<boolean>((observer) => {
      this.observer = observer;
    });
  }

  save(): void {
    const flight = this.flightForm.value;
    console.log('flight', flight);
    this.flightForm.markAllAsTouched();
  }

  ngOnInit(): void {
    this.route.params.subscribe((p) => {
      this.id = p.id;
      this.showDetails = p.showDetails;
    });

    this.route.data.subscribe((resolved) => {
      const flight = resolved.flight as Flight;
      this.flight = flight;

      this.flightForm.patchValue(flight as any);
    });
  }
}
