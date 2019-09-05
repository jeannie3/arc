import * as _ from 'lodash';

import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import { Scenario } from 'src/app/mock/mock-scenarios';
import { ScenarioDetailDialogComponent } from '../scenario-detail-dialog/scenario-detail-dialog';

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
    this.formScenarios = new FormArray([
      this.formBuilder.group({
        id: [_.uniqueId('SNR')],
        title: ['default title'],
        description: ['default description'],
        sceneIds: this.formBuilder.array([])
      })
    ]);
  }

  addScenario() {
    const newFormScenario = this.formBuilder.group({
      id: [_.uniqueId('SNR')],
      title: ['new default title'],
      description: ['new default description'],
      sceneIds: this.formBuilder.array([])
    });

    const dialogRef = this.openDetailDialog(newFormScenario.value);

    dialogRef.afterClosed().subscribe(result => {
    if (result) {
      newFormScenario.patchValue(result);
      this.formScenarios.push(newFormScenario);
    }
  });
  }

  editScenario(scenario: Scenario) {
    const dialogRef = this.openDetailDialog(scenario);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const scenFormGroup = this.formScenarios.controls.find(s => s.get('id').value === result.id);
        scenFormGroup.patchValue(result);
      }
    });
  }

  openDetailDialog(scenario: Scenario) {
    const dialogRef = this.dialog.open(ScenarioDetailDialogComponent, {
      data: {
        ...scenario
      },
      width: '1000px',
      height: '600px'
    });

    return dialogRef;
  }
}
