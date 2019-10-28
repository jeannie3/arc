import { Component, OnInit } from '@angular/core';

import { MatStepperModule } from '@angular/material/stepper';
import { Scene, SceneType } from '../../models/scene';

import { Router, ActivatedRoute } from '@angular/router';
import { ScenarioService } from 'src/app/services/scenario.service';


@Component({
  selector: 'app-explanation-view',
  templateUrl: './explanation-view.component.html',
  styleUrls: ['./explanation-view.component.scss']
})
export class ExplanationViewComponent implements OnInit {
  sceneId: string;
  currentScene: Scene;
  scenes: Array<Scene>;
  roleId: string;
  success: boolean;
  firstSceneId: string;
  userId: string

  constructor(private router: Router, private _Activatedroute: ActivatedRoute, private scenarioService: ScenarioService) {
    this._Activatedroute.paramMap.subscribe(params => {
      this.userId = params.get('userId')
      this.sceneId = params.get('sceneId');
      this.roleId = params.get('roleId');
      scenarioService.getScenes(this.roleId).subscribe(scenes => {
        this.currentScene = scenes.find(scene => scene.id == this.sceneId);
        if (this.currentScene.type == SceneType.FB_POSITIVE) {
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
    // hard coded scenario id here, will need to modify when we add multiple
    this.scenarioService.getRoles("1").subscribe(roles => {
      roles.forEach(role => {
        if (role.id == this.roleId) {
          this.firstSceneId = role.first_scene_id;
        }
      });

      if (this.firstSceneId) {
        this.router.navigate([this.userId, this.roleId, 'scene', this.firstSceneId]);
      } else {
        console.log("For some reason the first scene for the given role was not found");
      }
    });
  }
  goToRoles() {
    this.router.navigate([this.userId, '/role']);
  }
}
