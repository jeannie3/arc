import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Scenario } from 'src/app/mock/mock-scenarios';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

      this.scenario = this.data;
      const value = localStorage.getItem(this.scenario.id.toString());
      if (value) {
        this.scenario = JSON.parse(value);
      }

      if (!this.scenario) {
        this.scenario = {
          id: this.scenario.id,
          title: '',
          description: '',
          sceneIds: []
        };
      }

      this.formGroup = new FormGroup({
        id: new FormControl(this.scenario.id),
        title: new FormControl(this.scenario.title, Validators.required),
        description: new FormControl(this.scenario.description)
      });
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave() {
    localStorage.setItem(this.scenario.id.toString(), JSON.stringify(this.formGroup.value));
    this.dialogRef.close({ ...this.formGroup.value });
  }

  onCancel() {
    this.dialogRef.close();
  }

  testScenario() {
    console.log('test scenario here');
  }
}
