import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AnswerChoice } from 'src/app/models/answer-choice';
import { ScenarioService } from '../../services/scenario.service';
import { Scene } from '../../models/scene';

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

  updateScene(nextScene: string) {
    // if the next scene is -1, the current scene is the last scene
    this.currentScene = this.allScenesForRole.find(scene => scene.id === nextScene);

    if (this.currentScene.type === 'FB') {
      this.router.navigate([this.roleId + '/explanation/' + nextScene]);
    } else {
      this.router.navigate([this.roleId + '/scene/' + nextScene]);
    }
  }

  constructor(private router: Router, private scenarioService: ScenarioService, private _Activatedroute: ActivatedRoute) {
    this._Activatedroute.paramMap.subscribe(params => {
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
