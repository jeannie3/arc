import { Injectable } from '@angular/core';
import { scenarios } from './mock/scenarios';

@Injectable({
  providedIn: 'root'
})
export class ScenarioService {

  constructor() { }

  getScenarios() {
    return scenarios;
  }
}
