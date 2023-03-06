import { NgModule, InjectionToken } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { LoggerService } from './login/logger.service';
import { HttpClientModule } from '@angular/common/http';

import { LoggedGuardService } from './guards/logged-guard.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

export const API_URL = 'https://dummyjson.com';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, NgbModule],
  providers: [
    LoggerService,
    AuthGuardService,
    LoggedGuardService,
    ReactiveFormsModule,
    { provide: 'API_URL', useValue: API_URL },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
