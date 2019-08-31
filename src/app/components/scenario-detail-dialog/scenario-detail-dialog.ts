import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Scenario, SCENARIOS } from 'src/app/mock/mock-scenarios';
import { FormGroup, FormControl, Validators, FormControlName } from '@angular/forms';
const Fs = require('fs');

@Component({
    selector: 'app-scenario-detail-dialog',
    templateUrl: 'scenario-detail-dialog.html',
    styleUrls: ['./scenario-detail-dialog.scss']
  })
  export class ScenarioDetailDialogComponent {

    public scenario: Scenario;
    public formGroup: FormGroup;

    constructor(
      public dialogRef: MatDialogRef<ScenarioDetailDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data) {
        this.scenario = SCENARIOS.find(scenario => scenario.id === data.id);

        this.formGroup = new FormGroup({
          title: new FormControl(this.scenario.title, Validators.required),
          description: new FormControl(this.scenario.description)
        });


        this.formGroup.valueChanges.subscribe(value => {
          // only to see value for now - delete afterwards
          console.log(value);
        });
      }

    onNoClick(): void {
      this.dialogRef.close();
    }

    onSave() {
      console.log('save data here. Get form group value and post to url/write to file here');

      const data = this.formGroup.value;
      const path = '../../mock/mock-scenarios.ts';

      const json = JSON.stringify(data, null, 2);

      Fs.writeFile(path, json, (err) => {
        if (err) {
          console.error(err);
          throw err;
        }

        console.log('Saved data to file.');
      });
      
      this.dialogRef.close();
    }

    onCancel() {
      this.dialogRef.close();
    }

}
