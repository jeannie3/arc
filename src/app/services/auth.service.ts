import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from '../components/message-dialog/message-dialog.component';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private dialog: MatDialog) { }

  handleError = (errorResponse: HttpErrorResponse) => {
    let errorMessage = '';
    if (errorResponse.status === 401 && localStorage.getItem('userInfo') !== null) {
      this.renewAccessToken();
    } else if (errorResponse.status === 401 && localStorage.getItem('userInfo') === null) {
      errorMessage = 'You need to login beforehand';
    } else if (errorResponse.status === 403 || errorResponse.status === 400) {
      errorMessage = 'Invalid email or password';
    } else if (errorResponse.status === 404) {
      errorMessage = 'Not found';
    } else if (errorResponse.status <= 599 && errorResponse.status >= 500) {
      errorMessage = 'Something went wrong with the server! Please try again another time';
    } else if (errorResponse.status === 409) {
      errorMessage = 'This email is already taken';
    } else {
      errorMessage = errorResponse.statusText;
    }

    if (errorResponse.status !== 401 || localStorage.getItem('userInfo') === null) {
      const dialogRef = this.dialog.open(MessageDialogComponent, {
        data: {
          title: 'Oops',
          message: errorMessage,
          buttonText: 'Ok'
        }
      });
      document.getElementById('main-body').classList.add('blur');

      dialogRef.afterClosed().subscribe(() => {
        document.getElementById('main-body').classList.remove('blur');
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
          pass: userPass,
          id: jwt_decode(res[0].token).id
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
          pass: userPass,
          id: jwt_decode(res[0].token).id
        }));

        const dialogRef = this.dialog.open(MessageDialogComponent, {
          data: {
            title: 'Success!',
            message: 'You have successfully created an account',
            buttonText: 'Ok'
          }
        });
        document.getElementById('main-body').classList.add('blur');

        dialogRef.afterClosed().subscribe(() => {
          document.getElementById('main-body').classList.remove('blur');
        });

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
