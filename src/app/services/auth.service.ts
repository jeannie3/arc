import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { ErrorMessageDialogComponent } from '../components/error-message-dialog/error-message-dialog.component';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private dialog: MatDialog) { }

  handleError = (errorResponse: HttpErrorResponse) => {
    let message = '';
    if (errorResponse.status === 401 && localStorage.getItem('userInfo') !== null) {
      this.renewAccessToken();
    } else if (errorResponse.status === 401 && localStorage.getItem('userInfo') === null) {
      message = 'You need to login beforehand';
    } else if (errorResponse.status === 403 || errorResponse.status === 400) {
      message = 'Invalid email or password';
    } else if (errorResponse.status === 404) {
      message = 'Not found';
    } else if (errorResponse.status <= 599 && errorResponse.status >= 500) {
      message = 'Something went wrong with the server! Please try again another time';
    } else {
      message = errorResponse.statusText;
    }

    if (errorResponse.status !== 401 || localStorage.getItem('userInfo') === null) {
      this.dialog.open(ErrorMessageDialogComponent, {
        data: {
          errorMessage: message
        }
      });
    }
    return throwError(errorResponse);
  }

  login(userEmail: string, userPass: string): Observable<any> {
    const payload = {
      email: userEmail,
      pass: userPass
    };
    return this.http.post<any>(this.baseUrl + '/rpc/login', payload).pipe(
      tap((res) => {
        localStorage.setItem('accessToken', res[0].token);
        localStorage.setItem('userInfo', JSON.stringify({
          email: userEmail,
          pass: userPass
        }));
      }),
      catchError(this.handleError)
    );
  }

  register(userName: string, userEmail: string, userPass: string) {
    const payload = {
      name: userName,
      email: userEmail,
      pass: userPass
    };
    return this.http.post<any>(this.baseUrl + '/rpc/signup', payload).pipe(
      tap((res) => {
        localStorage.setItem('accessToken', res[0].token);
        localStorage.setItem('userInfo', JSON.stringify({
          email: userEmail,
          pass: userPass
        }));
      }),
      catchError(this.handleError)
    );
  }

  logout() {
    localStorage.setItem('accessToken', null);
    localStorage.setItem('userInfo', null);
  }

  renewAccessToken() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.login(userInfo.email, userInfo.pass).subscribe();
    location.reload();
  }
}
