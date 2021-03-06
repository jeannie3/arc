import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import { Progress } from 'src/app/models/progress';
import { Scenario } from 'src/app/models/scenario';
import { ScenarioService } from '../../services/scenario.service';
import { TwoOptionsDialogComponent } from '../two-options-dialog/two-options-dialog.component';

@Component({
  selector: 'app-role-list-view',
  templateUrl: './role-list-view.component.html',
  styleUrls: ['./role-list-view.component.scss']
})
export class RoleListViewComponent implements OnInit {
  scenarioId: string;
  scenarioIndex: number;
  scenarioTitle: string;
  scenarioDescription: string;
  formRoles: FormArray;
  userId: string;
  progress: Progress[];
  exit: string;
  loading: boolean;
  scenarios: Scenario[];

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private scenarioService: ScenarioService,
              private dialog: MatDialog,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.exit = params.get('exit');
    });
    this.userId = JSON.parse(localStorage.getItem('userInfo')).id;
    this.scenarioService.getUserProgress(this.userId).subscribe(progress => {
      this.progress = progress;
    });
  }

  ngOnInit() {
    if (this.userId) {
      // Checks to see if there are any uncompleted progresses
      this.scenarioService.getUncompletedProgress(this.userId).subscribe((progresses: Progress[]) => {
        if (progresses.length > 0 && !this.exit) {
          this.openProgressDialog(progresses[0]);
        }
      });

      this.scenarioService.getAllScenarios().subscribe(scenarios => {
        this.scenarios = scenarios;
        this.loadScenario();
      });
    }
  }

  loadScenario() {
    this.loading = true;
    this.formRoles = new FormArray([]);

    // Randomly pick scenario
    this.scenarioIndex = Math.floor(Math.random() * this.scenarios.length);
    this.scenarioTitle = this.scenarios[this.scenarioIndex].title;
    this.scenarioDescription = this.scenarios[this.scenarioIndex].description;
    this.scenarioId = this.scenarios[this.scenarioIndex].id;

    // Getting roles in scenario
    this.scenarioService.getRoles(this.scenarioId).subscribe(roles => {
      roles.forEach(role => {
        this.formRoles.push(this.formBuilder.group({
          id: role.id,
          name: role.name,
          first_scene_id: role.first_scene_id,
          is_completed: this.isRoleCompleted(role.id) ? true : false
        }));
      });
      this.loading = false;
    });
  }

  openProgressDialog(progress) {
    const opt1 = 'Continue';
    const opt2 = 'Cancel';
    const dialogRef = this.dialog.open(TwoOptionsDialogComponent, {
      data: {
        title: 'Continue progress?',
        content: 'We see that you have uncompleted progress made from the last time you visited. ' +
                 'Would you like to continue?',
        option1: opt1,
        option2: opt2
      }
    });
    document.getElementById('main-body').classList.add('blur');

    dialogRef.afterClosed().subscribe((res) => {
      if (res === opt1) {
        this.router.navigate([this.userId, 'roles', progress.role_id, 'scenario', this.scenarioId, 'scenes', progress.scene_id]);
      }
      document.getElementById('main-body').classList.remove('blur');
    });
  }

  chooseRole(role) {
    this.router.navigate([this.userId, 'roles', role.id, 'scenario', this.scenarioId, 'scenes', role.first_scene_id]);
  }

  isRoleCompleted(roleId) {
    return this.progress.some((prog) => {
      return prog.role_id === roleId && prog.is_completed;
    });
  }

  goToSettings() {
    this.router.navigate(['/settings']);
  }
}
