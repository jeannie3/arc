import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';

import { Router } from '@angular/router';
import { ScenarioService } from '../../services/scenario.service';

@Component({
  selector: 'app-role-list-view',
  templateUrl: './role-list-view.component.html',
  styleUrls: ['./role-list-view.component.scss']
})
export class RoleListViewComponent implements OnInit {
  scenarioTitle: string;
  scenarioDescription: string;
  formRoles: FormArray;


  constructor(private router: Router, private formBuilder: FormBuilder, private scenarioService: ScenarioService) { }

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
          first_scene_id: role.first_scene_id
        }));
      });
    });
  }


  chooseRole(role) {
    const userId = JSON.parse(localStorage.getItem('userInfo')).id;
    this.router.navigate([userId, 'roles', role.id, 'scenes', role.first_scene_id]);
  }

}
