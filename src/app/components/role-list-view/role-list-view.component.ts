import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import { Progress } from 'src/app/models/progress';
import { Router } from '@angular/router';
import { ScenarioService } from '../../services/scenario.service';
import { TwoOptionsDialogComponent } from '../two-options-dialog/two-options-dialog.component';

@Component({
  selector: 'app-role-list-view',
  templateUrl: './role-list-view.component.html',
  styleUrls: ['./role-list-view.component.scss']
})
export class RoleListViewComponent implements OnInit {
  scenarioTitle: string;
  scenarioDescription: string;
  formRoles: FormArray;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private scenarioService: ScenarioService,
              private dialog: MatDialog) { }

  ngOnInit() {
    const userId = JSON.parse(localStorage.getItem('userInfo')).id;
    this.scenarioService.getUncompletedProgress(userId).subscribe((progresses: Progress[]) => {
      if (progresses.length > 0) {
        const opt1 = 'Continue';
        const opt2 = 'Cancel';
        const dialogRef = this.dialog.open(TwoOptionsDialogComponent, {
          data: {
            title: 'Continue progress?',
            content: 'We see that you have some progress made from the last time you visited. ' +
                     'Would you like to continue?',
            option1: opt1,
            option2: opt2
          }
        });
        document.getElementById('main-body').classList.add('blur');

        dialogRef.afterClosed().subscribe((res) => {
          if (res === opt1) {
            const current = progresses[0];
            this.router.navigate([current.role_id, 'scene', current.scene_id]);
          }
          document.getElementById('main-body').classList.remove('blur');
        });
      }
    });

    this.scenarioService.getScenario('1').subscribe( result =>{
      this.scenarioTitle = result[0].title;
      this.scenarioDescription = result[0].description;
    });
    this.formRoles = new FormArray([]);
    this.scenarioService.getRoles('1').subscribe( roles => {
      roles.forEach(role => {
        this.formRoles.push(this.formBuilder.group({
            id: role.id,
            name: role.name,
            first_scene_id: role.first_scene_id
        }));
      });
    });
  }

  chooseRole(role) {
      this.router.navigate([role.id, 'scene', role.first_scene_id]);
  }
}
