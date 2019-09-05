import { Component, OnInit, Input } from '@angular/core';
import { ScenarioService } from '../../scenario.service';
import { Scene } from '../../models/scene';
import { Scenario } from '../../models/scenario';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-scene-container',
  templateUrl: './scene-container.component.html',
  styleUrls: ['./scene-container.component.scss']
})
export class SceneContainerComponent implements OnInit {
  @Input() currentScene: Scene; // the input is the first scene to display
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
