import { AfterContentInit, AfterViewInit, Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { AboutComponent } from '../about/about.component';
import { Flight } from '../flight-booking/flight';
import { AuthService } from '../shared/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('placeholder', { read: ViewContainerRef })
  container!: ViewContainerRef;

  flights: Flight[] = [
    { id: 1, from: 'A', to: 'B', date: '2022-09-08T17:00+01:00' },
    { id: 2, from: 'X', to: 'Y', date: '2022-09-08T17:00+01:00' },
    { id: 3, from: 'C', to: 'D', date: '2022-09-08T17:00+01:00' }
  ];

  constructor(private authService: AuthService) {}

  get userName(): string {
    return this.authService.userName;
  }

  ngAfterViewInit(): void {
    const cmpRef = this.container.createComponent(AboutComponent);
    cmpRef.instance.title = 'Hello from AboutCmp in Placeholder!';
  }

  deleteAll(): void {
    console.log('Now I would delete everything if this was not a cheap shareware version!');
  }

  login(): void {
    this.authService.login('Max', '123456');
  }

  logout(): void {
    this.authService.logout();
  }
}
