import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { delay, Subscription, Subject, throttleTime, tap } from 'rxjs';
import { LoggerService } from '../../logger.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less'],
})
export class SignupComponent {
  signupForm: FormGroup;
  valid = new Subject<boolean>();
  validObs = new Subscription();
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private logger: LoggerService
  ) {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
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
    if (this.signupForm.valid) {
      this.logger
        .signUp(this.signupForm.value)
        .subscribe({
          next: () => this.router.navigate(['login', 'signin']),
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
