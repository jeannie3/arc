import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://35.239.204.157:3000';

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
}

export enum ErrorMessage {
  DUPLICATE_ID = 'more than one row returned by a subquery used as an expression',
  EXPIRED_TOKEN = 'AWT expired',
  INVALID_EMAIL = 'new row for relation "users" violates check constraint "users_email_check"',
  INCORRECT_LOGIN = 'invalid user or password'
}
