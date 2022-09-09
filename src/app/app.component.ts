import { Component } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { debounceTime, filter } from 'rxjs/operators';
import { LoggerService } from './logger/logger.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Hello World!';
  loading = false;

  constructor(private logger: LoggerService, private router: Router) {
    logger.log('this is a log message');
    logger.debug('this is a debug message');

    this.router.events
      .pipe(
        filter(
          (e) => e instanceof NavigationStart || e instanceof NavigationEnd || e instanceof NavigationError || e instanceof NavigationCancel
        ),
        debounceTime(300)
      )
      .subscribe((event) => {
        if (event instanceof NavigationStart) {
          this.loading = true;
        } else {
          this.loading = false;
        }
      });
  }
}
