import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Scene, SceneType } from '../../models/scene';
import { scenes } from 'src/app/mock/scenes';
import { AnswerChoice } from 'src/app/models/answer-choice';
import { ScenarioService} from '../../services/scenario.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-scene-container',
  templateUrl: './scene-container.component.html',
  styleUrls: ['./scene-container.component.scss']
})
export class SceneContainerComponent implements OnInit {
  currentScene: Scene; 
  answerChoices: AnswerChoice[]

  updateScene(nextScene: string) {
    console.log("The next scene is " + nextScene);

    // if the next scene is -1, the current scene is the last scene
    this.currentScene = (scenes).find(scene => scene.id == nextScene);
    //this.answerChoices = this.scenarioService.getAnswerChoices(this.currentScene.id);
    console.log(this.answerChoices);
    if (this.currentScene.type == SceneType.Feedback) {
      this.router.navigate(['/explanation/' + nextScene]);
    }
  }

  constructor(private router: Router, private scenarioService: ScenarioService) {
    // this.scenarios = scenarioService.getScenario('1');
    this.currentScene = scenes[0];
    scenarioService.getAnswerChoices(this.currentScene.id).subscribe(value => {
      console.log(value);
      this.answerChoices = value;
    });
  }

  ngOnInit() { }
}
