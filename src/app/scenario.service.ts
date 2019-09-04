import { Injectable } from '@angular/core';
import { scenarios } from './scenarios';

@Injectable({
  providedIn: 'root'
})
export class ScenarioService {

  constructor() { }

  getScenarios() {
    return scenarios;
  }
}
