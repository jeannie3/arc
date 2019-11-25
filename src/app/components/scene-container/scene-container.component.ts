import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Scene, SceneType } from '../../models/scene';

import { AnswerChoice } from 'src/app/models/answer-choice';
import { MatDialog } from '@angular/material/dialog';
import { PauseDialogComponent } from '..//pause-dialog/pause-dialog.component';
import { Progress } from 'src/app/models/progress';
import { ScenarioService } from '../../services/scenario.service';

@Component({
  selector: 'app-scene-container',
  templateUrl: './scene-container.component.html',
  styleUrls: ['./scene-container.component.scss']
})
export class SceneContainerComponent implements OnInit {
  currentScene: Scene;
  answerChoices: AnswerChoice[];
  allScenesForRole: Scene[];
  roleId: string;
  userId: string;
  progress: Progress;
  isNew: boolean;

  constructor(private dialog: MatDialog,
              private router: Router,
              private scenarioService: ScenarioService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.userId = params.get('userId');
      this.roleId = params.get('roleId');
      this.scenarioService = scenarioService;
      scenarioService.getScenes(this.roleId).subscribe(scenes => {
        this.allScenesForRole = scenes;
        const firstSceneId = params.get('sceneId');
        this.currentScene = this.allScenesForRole.find(scene => +scene.id === +firstSceneId);

        scenarioService.getAnswerChoices(this.currentScene.id).subscribe(answers => {
          this.answerChoices = answers;
        });
      });
    });
  }

  updateScene(nextScene: string) {
    // if the next scene is -1, the current scene is the last scene
    this.currentScene = this.allScenesForRole.find(scene => scene.id === nextScene);

    this.scenarioService.getUncompletedProgress(this.userId).subscribe(progress => {
      if (progress.length === 0) {
        // creates new progress
        this.progress = new Progress();
        this.progress.user_id = this.userId;
        this.progress.role_id = this.roleId;
        this.progress.scene_id = this.currentScene.id;
        this.isNew = true;
      } else {
        // update old progress role id and scene id
        this.progress = progress[0];
        this.progress.role_id = this.roleId;
        this.progress.scene_id = this.currentScene.id;
        this.isNew = false;
      }
      this.scenarioService.saveProgress(this.progress, this.isNew).subscribe(success => {
        if (this.currentScene.type === SceneType.FB_POSITIVE || this.currentScene.type === SceneType.FB_NEGATIVE) {
          this.router.navigate([this.userId + '/roles/' + this.roleId + '/explanation/' + nextScene]);
        } else {
          this.router.navigate([this.userId + '/roles/' + this.roleId + '/scenes/' + nextScene]);
        }
      });
    });
  }

  onPause() {
    this.dialog.open(PauseDialogComponent, {
      data: {
        roleId: this.roleId
      }
    });
  }

  ngOnInit() { }
}
