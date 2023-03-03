import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoggerService } from '../login/logger.service';

@Injectable()
export class AuthGuardService {
  constructor(private logger: LoggerService, private router: Router) {}
  canActivate(): boolean {
    if (this.logger.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['login', 'signin']);
      return false;
    }
  }
}
