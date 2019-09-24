import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AnswerChoice } from '../models/answer-choice';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../models/role';
import { Scenario } from '../models/scenario';
import { Scene } from '../models/scene';

@Injectable({
  providedIn: 'root'
})
export class ScenarioService {

  private baseUrl = 'http://35.239.204.157:3000';

  constructor(private http: HttpClient) { }

  getScenario(scenarioId: string): Observable<Scenario> {
    return this.http.get<Scenario>(this.baseUrl + '/scenarios?id=eq.' + scenarioId, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('accessToken')
      })
    });
  }

  getRoles(scenarioId: string): Observable<Role[]> {
    return this.http.get<Role[]>(this.baseUrl + '/roles?scenario_id=eq.' + scenarioId, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('accessToken')
      })
    });
  }

  getScenes(roleId: string): Observable<Scene[]> {
    return this.http.get<Scene[]>(this.baseUrl + '/scenes?role_id=eq.' + roleId, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('accessToken')
      })
    });
  }

  getAnswerChoices(sceneId: string): Observable<AnswerChoice[]> {
    return this.http.get<AnswerChoice[]>(this.baseUrl + '/answer_choices?current_scene_id=eq.' + sceneId, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('accessToken')
      })
    });
  }
}
