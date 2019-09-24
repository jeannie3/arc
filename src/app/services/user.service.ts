import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Progress } from '../models/progress';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://35.239.204.157:3000';

  constructor(private http: HttpClient) { }

  getUserProgress(userId): Observable<Progress> {
    return this.http.get<Progress>(this.baseUrl + '/progress?user_id=eq.' + userId, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('accessToken')
      })
    });
  }
}
