import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'app-scenario-list-view',
  templateUrl: './scenario-list-view.component.html',
  styleUrls: ['./scenario-list-view.component.scss']
})
export class ScenarioListViewComponent implements OnInit {
  formScenario = this.formBuilder.group({
    id: [_.uniqueId("SNR")],
    title: ["new default title"],
    description: ["new default description"],
    sceneIds: this.formBuilder.array([])
  })

  formScenarios = [
    this.formBuilder.group({
      id: [_.uniqueId("SNR")],
      title: ['default title'],
      description: ['default description'],
      sceneIds: this.formBuilder.array([])
    })
  ]

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  addScenario() {
    console.log("add scenario");
    this.formScenarios.push(this.formScenario);
  }
}
