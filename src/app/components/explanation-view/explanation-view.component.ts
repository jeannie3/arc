import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Scene, SceneType } from '../../models/scene';

import { Progress } from 'src/app/models/progress';
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
  userId: string;
  progress: Progress;
  scenarioId: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private scenarioService: ScenarioService) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.userId = params.get('userId');
      this.sceneId = params.get('sceneId');
      this.roleId = params.get('roleId');
      this.scenarioId = params.get('scenarioId');
      this.scenarioService.getScenes(this.roleId).subscribe(scenes => {
        this.currentScene = scenes.find(scene => +scene.id === +this.sceneId);
        if (this.currentScene.type === SceneType.FB_POSITIVE) {
          this.success = true;
          // mark a role as completed if we have reached positive feedback
          this.scenarioService.getUncompletedProgress(this.userId).subscribe(progress => {
            this.progress = progress[0];
            this.progress.is_completed = true;
            this.scenarioService.saveProgress(this.progress, false).subscribe();
          });
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
    this.scenarioService.getRoles(this.scenarioId).subscribe(roles => {
      roles.forEach(role => {
        if (+role.id === +this.roleId) {
          this.firstSceneId = role.first_scene_id;
        }
      });

      if (this.firstSceneId) {
        this.router.navigate([this.userId, 'roles', this.roleId, 'scenario', this.scenarioId, 'scenes', this.firstSceneId]);
      } else {
        console.log('For some reason the first scene for the given role was not found');
      }
    });
  }
  goToRoles() {
    this.router.navigate(['/role']);
  }
}
