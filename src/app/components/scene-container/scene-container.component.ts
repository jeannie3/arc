import { Component, OnInit, Input } from '@angular/core';
import { ScenarioService } from '../../scenario.service';
import { Scene } from '../../scene';
import { Scenario } from '../../scenario';

@Component({
  selector: 'app-scene-container',
  templateUrl: './scene-container.component.html',
  styleUrls: ['./scene-container.component.scss']
})
export class SceneContainerComponent implements OnInit {
  @Input() currentScene: Scene;
  scenarios: Array<Scenario>;

  updateScene(nextScene: number) {
    console.log("The next scene is " + nextScene);
    this.currentScene = (this.scenarios[0].scenes).find(scene => scene.id == nextScene);
  }

  constructor(scenarioService: ScenarioService) {
    this.scenarios = scenarioService.getScenarios();
  }

  ngOnInit() { }
}
