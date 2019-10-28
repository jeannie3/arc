import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AnswerChoice } from '../models/answer-choice';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../models/role';
import { Scenario } from '../models/scenario';
import { Scene } from '../models/scene';
import { Progress } from '../models/progress';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScenarioService {

  private baseUrl = environment.baseUrl;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
    })
  };

  constructor(private http: HttpClient,
    private authService: AuthService) { }

  getScenario(scenarioId: string): Observable<Scenario> {
    return this.http.get<Scenario>(this.baseUrl + '/scenarios?id=eq.' + scenarioId, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('accessToken')
      })
    }).pipe(
      catchError(this.authService.handleError)
    );
  }

  getRoles(scenarioId: string): Observable<Role[]> {
    return this.http.get<Role[]>(this.baseUrl + '/roles?scenario_id=eq.' + scenarioId, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('accessToken')
      })
    }).pipe(
      catchError(this.authService.handleError)
    );
  }

  getScenes(roleId: string): Observable<Scene[]> {
    return this.http.get<Scene[]>(this.baseUrl + '/scenes?role_id=eq.' + roleId, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('accessToken')
      })
    }).pipe(
      catchError(this.authService.handleError)
    );
  }

  getAnswerChoices(sceneId: string): Observable<AnswerChoice[]> {
    return this.http.get<AnswerChoice[]>(this.baseUrl + '/answer_choices?current_scene_id=eq.' + sceneId, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('accessToken')
      })
    }).pipe(
      catchError(this.authService.handleError)
    );
  }

  saveProgress(progress: Progress, isNew: boolean): Observable<Progress[]> {
    if (isNew) {
      console.log("post new progress");
      return this.http.post<Progress[]>(this.baseUrl + '/progress', progress, this.httpOptions)
        .pipe(
          catchError(this.authService.handleError)
        )
    } else {
      console.log("update current progress");
      return this.http.put<Progress[]>(this.baseUrl + '/progress?id=eq.' + progress.id, progress, this.httpOptions)
        .pipe(
          catchError(this.authService.handleError)
        )
    }
  }

  getProgress(userId: string, roleId: string): Observable<Progress[]> {
    const filterQuery = '?and=(user_id.eq.' + userId + ',role_id.eq.' + roleId + ')';
    return this.http.get<Progress[]>(this.baseUrl + '/progress' + filterQuery, this.httpOptions)
      .pipe(
        catchError(this.authService.handleError)
      )
  }
}
