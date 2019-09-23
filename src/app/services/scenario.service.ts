import { Injectable } from '@angular/core';
import { Role } from '../models/role';
import { Scenario } from '../models/scenario';
import { scenarios } from '../mock/scenarios';

@Injectable({
  providedIn: 'root'
})
export class ScenarioService {

  constructor() { }

  getScenarios(): Scenario[] {
    return scenarios;
  }

  getRoles(scenarioId): Role[] {
    return [];
  }

  getScenes() {

  }

  getAnswerChoices() {

  }
}
