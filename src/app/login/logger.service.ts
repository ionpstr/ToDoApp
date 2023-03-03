import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

const api_url = 'https://dummyjson.com/';

@Injectable()
export class LoggerService {
  user!: BehaviorSubject<User>;
  userObj: User = {
    id: null,
    firstName: null,
    lastName: null,
    email: null,
    username: null,
    token: null,
    image: null,
  };
  constructor(private http: HttpClient, private router: Router) {
    this.user = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('user') || JSON.stringify(this.userObj))
    );
  }

  public get getUser(): User {
    return this.user.getValue();
  }

  public get getToken(): string {
    return JSON.parse(localStorage.getItem('token') || '');
  }

  login(body: {}) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    const url = `${api_url}auth/login`;
    return this.http.post(url, body, httpOptions).pipe(
      map((user: any) => {
        let u = {
          firstName: user.firstName,
          id: user.id,
          lastName: user.lastName,
          email: user.email,
          token: user.token,
          username: user.username,
          image: user.image,
        };
        localStorage.setItem('user', JSON.stringify(u));
        localStorage.setItem('token', JSON.stringify(u.token));
        this.user.next(u);
        return user;
      })
    );
  }

  signUp(body: {}) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    const url = `${api_url}users/add`;
    return this.http.post(url, body, httpOptions);
  }

  isAuthenticated(): boolean {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

  logOut() {
    this.user.next(this.userObj);
    localStorage.clear();
    this.router.navigate(['login', 'signin']);
  }
}
