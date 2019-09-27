import { Component, OnInit, Input } from '@angular/core';
import { ScenarioService } from '../../scenario.service';
import { Scene, SceneType } from '../../models/scene';
import { Scenario } from '../../models/scenario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scene-container',
  templateUrl: './scene-container.component.html',
  styleUrls: ['./scene-container.component.scss']
})
export class SceneContainerComponent implements OnInit {
  currentScene: Scene; 
  scenarios: Array<Scenario>;

  updateScene(nextScene: number) {
    console.log("The next scene is " + nextScene);

    // if the next scene is -1, the current scene is the last scene
    this.currentScene = (this.scenarios[0].scenes).find(scene => scene.id == nextScene);
    if(this.currentScene.type == SceneType.Feedback) {
      this.router.navigate(['/explanation/' + nextScene]);
    }
  }

  constructor(scenarioService: ScenarioService, private router: Router) {
    this.scenarios = scenarioService.getScenarios();
    this.currentScene = this.scenarios[0].scenes[0];
  }

  ngOnInit() { }
}
