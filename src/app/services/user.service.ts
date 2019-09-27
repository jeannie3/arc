import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Progress } from '../models/progress';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient,
              private authService: AuthService) { }

  getUserProgress(userId): Observable<Progress> {
    return this.http.get<Progress>(this.baseUrl + '/progress?user_id=eq.' + userId, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('accessToken')
      })
    }).pipe(
      catchError(this.authService.handleError)
    );
  }
}
