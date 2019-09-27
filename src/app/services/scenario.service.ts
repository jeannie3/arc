import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AnswerChoice } from '../models/answer-choice';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../models/role';
import { Scenario } from '../models/scenario';
import { Scene } from '../models/scene';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScenarioService {

  private baseUrl = environment.baseUrl;

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
}
