import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Scene, SceneType } from '../../models/scene';
import { scenes } from 'src/app/mock/scenes';

@Component({
  selector: 'app-scene-container',
  templateUrl: './scene-container.component.html',
  styleUrls: ['./scene-container.component.scss']
})
export class SceneContainerComponent implements OnInit {
  currentScene: Scene; 

  updateScene(nextScene: string) {
    console.log("The next scene is " + nextScene);

    // if the next scene is -1, the current scene is the last scene
    this.currentScene = (scenes).find(scene => scene.id == nextScene);
    if(this.currentScene.type == SceneType.Feedback) {
      this.router.navigate(['/explanation/' + nextScene]);
    }
  }

  constructor(private router: Router) {
    // this.scenarios = scenarioService.getScenario('1');
    this.currentScene = scenes[0];
  }

  ngOnInit() { }
}
