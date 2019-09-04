import { Component, OnInit, Input } from '@angular/core';
import { scenarios } from '../../scenarios';
import { Scene } from '../../scene';

@Component({
  selector: 'app-scene-container',
  templateUrl: './scene-container.component.html',
  styleUrls: ['./scene-container.component.scss']
})
export class SceneContainerComponent implements OnInit {
  @Input() currentScene: Scene;

  updateScene(nextScene: number) {
    console.log("The next scene is " + nextScene);
    this.currentScene = (scenarios[0].scenes).find(scene => scene.id == nextScene);
  }

  constructor() { }

  ngOnInit() { }
}
