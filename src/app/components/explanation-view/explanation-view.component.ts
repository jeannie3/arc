import { Component, OnInit } from '@angular/core';

import {MatStepperModule} from '@angular/material/stepper'; 
import {Scene} from '../../models/scene';

import { Router, ActivatedRoute } from '@angular/router';
import { ScenarioService } from 'src/app/services/scenario.service';


@Component({
  selector: 'app-explanation-view',
  templateUrl: './explanation-view.component.html',
  styleUrls: ['./explanation-view.component.scss']
})
export class ExplanationViewComponent implements OnInit {
  id;
  currentScene;
  scenes;
  roleId;
  success: boolean;

  constructor(private router: Router, private _Activatedroute:ActivatedRoute, private scenarioService: ScenarioService) {
    this._Activatedroute.paramMap.subscribe(params => { 
      this.id = params.get('sceneId');
      this.roleId = params.get('roleId');
      scenarioService.getScenes(this.roleId).subscribe(scenes => {
        this.currentScene = scenes.find(scene => scene.id == this.id);
        if (this.currentScene.endingMessage == "Congrats!") {
          this.success = true;
        } else {
          this.success = false;
        }
      });
    });
  }

  ngOnInit() {
  }

  tryAgain() {
    this.router.navigate(['/role']);
  }
}
