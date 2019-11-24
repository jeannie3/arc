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
  scenarioId: string;
  scenarioTitle: string;
  scenarioDescription: string;
  formRoles: FormArray;
  userId: string;
  progress: Progress[];

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private scenarioService: ScenarioService,
              private dialog: MatDialog) {
    const userId = JSON.parse(localStorage.getItem('userInfo')).id;
    this.userId = userId;
    this.scenarioService.getUserProgress(this.userId).subscribe(progress => {
      this.progress = progress;
    });
  }

  ngOnInit() {
    this.userId = JSON.parse(localStorage.getItem('userInfo')).id;

    if (this.userId) {
      this.scenarioService.getUncompletedProgress(this.userId).subscribe((progresses: Progress[]) => {
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
              this.router.navigate([this.userId, 'roles', current.role_id, 'scenes', current.scene_id]);
            }
            document.getElementById('main-body').classList.remove('blur');
          });
        }
      });
    }

    this.scenarioService.getAllScenarios().subscribe(scenerios => {
      this.scenarioId = '' + Math.floor(Math.random() * scenerios.length);
      this.scenarioTitle = scenerios[this.scenarioId].title;
      this.scenarioDescription = scenerios[this.scenarioId].description;
      console.log(this.scenarioId)
      console.log(scenerios)

      this.formRoles = new FormArray([]);
      this.scenarioService.getRoles(this.scenarioId).subscribe(roles => {
        roles.forEach(role => {
          this.formRoles.push(this.formBuilder.group({
            id: role.id,
            name: role.name,
            first_scene_id: role.first_scene_id,
            is_completed: this.isRoleCompleted(role.id) ? true : false
          }));
        });
      });
    });
  }


  chooseRole(role) {
    this.router.navigate([this.userId, 'roles', role.id, 'scenes', role.first_scene_id]);
  }

  isRoleCompleted(roleId) {
    // does the given role exist and is marked completed
    return this.progress.some(function(p) {
      return p.role_id === roleId && p.is_completed;
    });
  }

  goToSettings(){
    this.router.navigate(['/settings'])
  }
}
