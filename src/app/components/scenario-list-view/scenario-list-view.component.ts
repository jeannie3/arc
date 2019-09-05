import * as _ from 'lodash';

import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import { Scenario } from 'src/app/models/scenario';

@Component({
  selector: 'app-scenario-list-view',
  templateUrl: './scenario-list-view.component.html',
  styleUrls: ['./scenario-list-view.component.scss']
})
export class ScenarioListViewComponent implements OnInit {

  formScenarios: FormArray;

  constructor(private formBuilder: FormBuilder,
              public dialog: MatDialog,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    // TODO: get scenario list from database
    this.formScenarios = new FormArray([]);
    Object.keys(localStorage).forEach(scenarioId => {
      const scenario: Scenario = JSON.parse(localStorage.getItem(scenarioId));

      this.formScenarios.push(this.formBuilder.group({
        id: [scenario.id],
        title: [scenario.title],
        description: [scenario.description],
        sceneIds: this.formBuilder.array([])
      }));
    });
  }

  addScenario() {
    this.router.navigate(['/scenario', 'new']);
  }

  editScenario(scenario: Scenario) {
    this.router.navigate(['/scenario', scenario.id]);
  }
}
