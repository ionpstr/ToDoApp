import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoggerService } from '../login/logger.service';

@Injectable()
export class LoggedGuardService {
  constructor(private router: Router, private logger: LoggerService) {}
  canActivate(): boolean {
    if (this.logger.isAuthenticated()) {
      this.router.navigate(['home']);
      return false;
    } else {
      return true;
    }
  }
}
