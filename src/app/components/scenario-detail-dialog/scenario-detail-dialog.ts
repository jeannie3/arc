import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Scenario, SCENARIOS } from 'src/app/mock/mock-scenarios';
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

      const value = this.getCookie(data.id);
      if (value) {
        this.scenario = JSON.parse(value);
        this.scenario.id = data.id;
      } else {
        this.scenario = SCENARIOS.find(scenario => scenario.id === data.id);
      }

      if (!this.scenario) {
        this.scenario = {
          id: 0, // fake id for now - TODO: should generate a new id
          title: '',
          description: '',
          sceneIds: []
        };
      }

      this.formGroup = new FormGroup({
        title: new FormControl(this.scenario.title, Validators.required),
        description: new FormControl(this.scenario.description)
      });
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave() {
    const value = JSON.stringify(this.formGroup.value);
    this.setCookie(this.scenario.id, value, 7);
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  testScenario() {
    console.log('test scenario here');
  }

  setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    const expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
  }

  getCookie(cname) {
    const name = cname + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }
}
