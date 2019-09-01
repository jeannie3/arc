import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Scenario, mockScenarios } from './scenario';
@Component({
  selector: 'app-scenario-list-view',
  templateUrl: './scenario-list-view.component.html',
  styleUrls: ['./scenario-list-view.component.scss']
})
export class ScenarioListViewComponent implements OnInit {
  scenarios: Scenario[] = mockScenarios;
  formScenario = this.formBuilder.group({
    id: [1],
    title: ["new"],
    description: ["new"],
    sceneIds: this.formBuilder.array([1, 2, 3])
  })

  formScenarios = [
    this.formBuilder.group({
      id: ['default id'],
      title: ['default title'],
      description: ['default description'],
      sceneIds: this.formBuilder.array([])
    })
  ]

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  addItem() {
    this.scenarios.push(<Scenario>({ id: 1, name: "new" }));
  }

  addScenario() {
    console.log("add scenario");
    this.formScenarios.push(this.formScenario);
  }
}
