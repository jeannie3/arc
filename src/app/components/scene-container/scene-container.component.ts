import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Scene, SceneType } from '../../models/scene';
import { AnswerChoice } from 'src/app/models/answer-choice';
import { ScenarioService} from '../../services/scenario.service';

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
    console.log("The next scene is " + nextScene);

    // if the next scene is -1, the current scene is the last scene
    console.log("***************")
    console.log(this.allScenesForRole);
    this.currentScene = this.allScenesForRole.find(scene => scene.id == nextScene);
    console.log(this.currentScene.type);

    //this.answerChoices = this.scenarioService.getAnswerChoices(this.currentScene.id);
    if (this.currentScene.type === 'FB') {
      this.router.navigate([this.roleId + '/explanation/' + nextScene]);
    } else {
      this.router.navigate([this.roleId + '/scene/' + nextScene]);
    }
  }

  constructor(private router: Router, private scenarioService: ScenarioService, private _Activatedroute:ActivatedRoute) {
    // this.scenarios = scenarioService.getScenario('1');
    this._Activatedroute.paramMap.subscribe(params => {
      this.roleId = params.get('roleId');
      scenarioService.getScenes(this.roleId).subscribe(scenes => {
        this.allScenesForRole = scenes;

        let firstSceneId = params.get('sceneId');
        this.currentScene = this.allScenesForRole.find(scene => scene.id == firstSceneId);

        scenarioService.getAnswerChoices(this.currentScene.id).subscribe(answers => {
          this.answerChoices = answers;
        });
      });
    });
  }

  ngOnInit() { }
}
