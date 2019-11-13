import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';

import { Router } from '@angular/router';
import { ScenarioService } from '../../services/scenario.service';
import { Progress } from 'src/app/models/progress';

@Component({
  selector: 'app-role-list-view',
  templateUrl: './role-list-view.component.html',
  styleUrls: ['./role-list-view.component.scss']
})
export class RoleListViewComponent implements OnInit {
  scenarioTitle: string;
  scenarioDescription: string;
  formRoles: FormArray;
  userId: string;
  progress: Progress[];


  constructor(private router: Router, private formBuilder: FormBuilder, private scenarioService: ScenarioService) { 
    const userId = JSON.parse(localStorage.getItem('userInfo')).id;
    this.userId = userId;
    this.scenarioService.getUserProgress(this.userId).subscribe(progress => {
      this.progress = progress;
    });
  }

  ngOnInit() {
    this.scenarioService.getScenario('1').subscribe(result => {
      this.scenarioTitle = result[0].title;
      this.scenarioDescription = result[0].description;
    });
    this.formRoles = new FormArray([]);
    this.scenarioService.getRoles('1').subscribe(roles => {
      roles.forEach(role => {
        this.formRoles.push(this.formBuilder.group({
          id: role.id,
          name: role.name,
          first_scene_id: role.first_scene_id,
          is_completed: this.isRoleCompleted(role.id) ? true : false
        }));
      });
    });
  }


  chooseRole(role) {
    this.router.navigate([this.userId, 'roles', role.id, 'scenes', role.first_scene_id]);
  }

  isRoleCompleted(roleId) {
    // does the given role exist and is marked completed
    return this.progress.some(function(p) {
      return p.id == roleId && p.is_completed;
    });
  }

}
