import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder } from '@angular/forms';
import { Role } from 'src/app/models/role';
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
  

  constructor(private router: Router,private formBuilder: FormBuilder, private scenarioService: ScenarioService) { }

  ngOnInit() {
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

    
  chooseRole(role){
      this.router.navigate([role.id,'scene',role.first_scene_id]);
  }

}
