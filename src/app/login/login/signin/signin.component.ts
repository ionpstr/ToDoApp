import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { delay, Subscription, Subject, throttleTime, tap, retry } from 'rxjs';
import { LoggerService } from '../../logger.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.less'],
})
export class SigninComponent {
  signinForm: FormGroup;
  valid = new Subject<boolean>();
  validObs = new Subscription();
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private logger: LoggerService
  ) {
    this.signinForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.validObs = this.valid
      .pipe(
        throttleTime(3000),
        delay(3000),
        tap(() => this.valid.next(false))
      )
      .subscribe();
  }

  submitForm() {
    if (this.signinForm.valid) {
      this.logger
        .login(this.signinForm.value)
        .pipe(retry(2))
        .subscribe({
          next: () => this.router.navigate(['home']),
          error: () => this.valid.next(true),
        });
    } else {
      this.valid.next(true);
    }
  }
  ngOnDestroy() {
    this.validObs.unsubscribe();
  }
}
