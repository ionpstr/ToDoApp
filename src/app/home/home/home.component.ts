import { Component } from '@angular/core';
import { LoggerService } from 'src/app/login/logger.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})
export class HomeComponent {
  user: User;
  open: boolean = false;
  constructor(private logger: LoggerService) {
    this.user = logger.getUser;
  }

  logOut() {
    this.logger.logOut();
  }

  openLogout() {
    this.open = !this.open;
  }
}
