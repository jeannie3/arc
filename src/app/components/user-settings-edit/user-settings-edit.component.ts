import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';

import { Router } from '@angular/router';

@Component({
    selector: 'user-settings-edit',
    templateUrl: './user-settings-edit.component.html',
    styleUrls: ['./user-settings-edit.component.scss']
  })
  export class UserSettingsEditComponent implements OnInit {
    // scenarioDescription: string;
    // formRoles: FormArray;
    
  
    constructor(private router: Router) {//,private formBuilder: FormBuilder, private scenarioService: ScenarioService) { }
    }

	ngOnInit() {
    //   this.scenarioService.getScenario('1').subscribe( result =>{
    //     this.scenarioTitle = result[0].title;
    //     this.scenarioDescription = result[0].description;
    //   });
    //   this.formRoles = new FormArray([]);
    //   this.scenarioService.getRoles('1').subscribe( roles => {
    //     roles.forEach(role => {
    //       this.formRoles.push(this.formBuilder.group({
    //           id: role.id,
    //           name: role.name,
    //           first_scene_id: role.first_scene_id
    //       }));
    //     });
    //   });
    }

    onCancel() {
        this.router.navigate(['/settings'])
    }
}