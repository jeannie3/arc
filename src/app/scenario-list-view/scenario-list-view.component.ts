import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Scenario, mockScenarios } from './scenario';
@Component({
  selector: 'app-scenario-list-view',
  templateUrl: './scenario-list-view.component.html',
  styleUrls: ['./scenario-list-view.component.scss']
})
export class ScenarioListViewComponent implements OnInit {
  scenarios: Scenario[] = mockScenarios;

  constructor() { }

  ngOnInit() {
  }

  addItem() {
    this.scenarios.push(<Scenario>({ id: 1, name: "new" }));
  }
}
