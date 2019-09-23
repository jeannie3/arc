import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { users } from '../mock/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://35.239.204.157:3000';

  private currentUserId: string;
  private accessToken: string;

  constructor(private http: HttpClient) { }

  login(userEmail: string, userPass: string): Observable<any> {
    const payload = {
      email: userEmail,
      pass: userPass
    };
    return this.http.post<any>(this.baseUrl + '/rpc/login', payload);
  }

  register(userName, userEmail, userPass) {
    const payload = {
      name: userName,
      email: userEmail,
      pass: userPass
    };
    return this.http.post<any>(this.baseUrl + '/rpc/signup', payload);
  }

  setCurrentUserId(id: string) {
    this.currentUserId = id;
  }

  getCurrentUserId(): string {
    return this.currentUserId;
  }

  setAccessToken(token: string) {
    console.log('setting token', token);
    this.accessToken = token;
  }

  getAccessToken(): string {
    console.log('getting token', this.accessToken)
    return this.accessToken;
  }
}

export enum ErrorMessage {
  DUPLICATE_ID = 'more than one row returned by a subquery used as an expression',
  INVALID_EMAIL = 'new row for relation "users" violates check constraint "users_email_check"',
  INCORRECT_LOGIN = 'invalid user or password'
}
