import { Component, OnInit } from '@angular/core';

import { Scenario } from '../../models/scenario';
import { Scene } from '../../models/scene';

@Component({
  selector: 'app-scene-container',
  templateUrl: './scene-container.component.html',
  styleUrls: ['./scene-container.component.scss']
})
export class SceneContainerComponent implements OnInit {
  currentScene: Scene; // the input is the first scene to display
  scenarios: Array<Scenario>;


  constructor() {
    // this.scenarios = scenarioService.getScenario('1');
    //this.currentScene = scenes[0];
  }

  ngOnInit() { }

  updateScene(nextScene: string) {
    console.log('The next scene is ' + nextScene);
    //this.currentScene = (scenes).find(scene => scene.id === nextScene);
  }
}
