import { Component, OnInit } from '@angular/core';
import { scenarios } from '../../scenarios';
import { Scene } from '../../scene';

@Component({
  selector: 'app-scene-container',
  templateUrl: './scene-container.component.html',
  styleUrls: ['./scene-container.component.scss']
})
export class SceneContainerComponent implements OnInit {
  currentScene: Scene = scenarios[0].scenes[0];

  onAnswered(nextScene: number) {
    console.log("The next scene is " + nextScene);
  }

  constructor() { }

  ngOnInit() { }
}
