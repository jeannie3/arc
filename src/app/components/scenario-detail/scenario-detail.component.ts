import * as _ from 'lodash';

import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Component } from '@angular/core';
import { Scenario } from 'src/app/models/scenario';

@Component({
  selector: 'app-scenario-detail-component',
  templateUrl: 'scenario-detail.component.html',
  styleUrls: ['./scenario-detail.component.scss']
})
export class ScenarioDetailComponent {

  public scenario: Scenario;
  public formGroup: FormGroup;

  private scenarioId;

  constructor(
    private router: Router,
    private route: ActivatedRoute) {


      this.route.params.subscribe(params => {
        this.scenarioId = params.id;
      });

      const value = localStorage.getItem(this.scenarioId);
      if (value) {
        this.scenario = JSON.parse(value);
      }

      if (!this.scenario || this.scenarioId === 'new') {
        this.scenario = {
          id: +_.uniqueId('SNR'),
          title: 'default title',
          description: 'default description',
          sceneIds: []
        };
      }

      this.formGroup = new FormGroup({
        id: new FormControl(this.scenario.id),
        title: new FormControl(this.scenario.title, Validators.required),
        description: new FormControl(this.scenario.description)
      });
    }

  // onNoClick(): void {
  //   this.dialogRef.close();
  // }

  onSave() {
    localStorage.setItem(this.scenario.id.toString(), JSON.stringify(this.formGroup.value));
    this.router.navigate(['/']);
    // this.dialogRef.close({ ...this.formGroup.value });
  }

  onCancel() {
    this.router.navigate(['/']);
  //   this.dialogRef.close();
  }

  testScenario() {
    console.log('test scenario here');
  }
}
