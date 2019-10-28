import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AnswerChoice } from 'src/app/models/answer-choice';
import { ScenarioService } from '../../services/scenario.service';
import { Scene, SceneType } from '../../models/scene';
import { Progress } from 'src/app/models/progress';

@Component({
  selector: 'app-scene-container',
  templateUrl: './scene-container.component.html',
  styleUrls: ['./scene-container.component.scss']
})
export class SceneContainerComponent implements OnInit {
  currentScene: Scene;
  answerChoices: AnswerChoice[]
  allScenesForRole: Scene[]
  roleId: string;
  userId: string;
  progress: Progress;

  updateScene(nextScene: string) {
    // if the next scene is -1, the current scene is the last scene
    this.currentScene = this.allScenesForRole.find(scene => scene.id === nextScene)

    if (this.currentScene.type === SceneType.FB_POSITIVE || this.currentScene.type === SceneType.FB_NEGATIVE) {
      this.router.navigate([this.userId, this.roleId + '/explanation/' + nextScene]);
    } else {
      this.router.navigate([this.userId, this.roleId + '/scene/' + nextScene]);
    }
  }

  constructor(private router: Router, private scenarioService: ScenarioService, private _Activatedroute: ActivatedRoute) {
    this._Activatedroute.paramMap.subscribe(params => {
      this.userId = params.get('userId');
      this.roleId = params.get('roleId');
      scenarioService.getScenes(this.roleId).subscribe(scenes => {
        this.allScenesForRole = scenes;

        const firstSceneId = params.get('sceneId');
        this.currentScene = this.allScenesForRole.find(scene => +scene.id === +firstSceneId);

        console.log(this.currentScene)

        scenarioService.getAnswerChoices(this.currentScene.id).subscribe(answers => {
          this.answerChoices = answers;
        });
      });
    });
  }

  ngOnInit() { }
}
