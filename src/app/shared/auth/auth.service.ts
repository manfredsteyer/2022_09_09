import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  userName = '';

  login(userName: string, password: string): void {
    this.userName = userName;
  }

  logout(): void {
    this.userName = '';
  }

  isAuthenticated(): boolean {
    return !!this.userName;
  }
}
